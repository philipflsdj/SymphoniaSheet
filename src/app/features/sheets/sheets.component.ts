import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusicService, SheetFilter, PaginatedResult } from '../../core/services/sheet-music.service';
import { SheetMusic } from '../../core/models/sheet-music.model';
import { Category } from '../../core/models/category.model';
import { TableComponent, TableColumn } from '../../shared/components/table/table.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { SheetCardComponent } from './components/sheet-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [
    MatIconModule, 
    TableComponent, 
    BadgeComponent, 
    ButtonComponent, 
    InputComponent, 
    ModalComponent, 
    FormsModule,
    SheetCardComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-surface-900">Acervo de Partituras</h1>
          <p class="text-surface-500 mt-1">Explore, filtre e encontre a partitura perfeita para o seu ensaio.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="bg-surface-100 p-1 rounded-lg flex items-center">
            <button 
              (click)="viewMode.set('grid')"
              [class]="'w-10 h-10 rounded-md flex items-center justify-center transition-colors ' + (viewMode() === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-surface-500 hover:text-surface-900')"
            >
              <mat-icon>grid_view</mat-icon>
            </button>
            <button 
              (click)="viewMode.set('table')"
              [class]="'w-10 h-10 rounded-md flex items-center justify-center transition-colors ' + (viewMode() === 'table' ? 'bg-white shadow-sm text-primary-600' : 'text-surface-500 hover:text-surface-900')"
            >
              <mat-icon>view_list</mat-icon>
            </button>
          </div>
          <app-button icon="add" (onClick)="router.navigate(['/admin/sheets/create'])">Nova Partitura</app-button>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-4 rounded-2xl border border-surface-200 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <mat-icon class="text-surface-400">search</mat-icon>
            </div>
            <input
              type="text"
              [(ngModel)]="filter().query"
              (ngModelChange)="onFilterChange()"
              class="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-xl leading-5 bg-surface-50 placeholder-surface-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
              placeholder="Buscar por título ou artista..."
            />
          </div>
          <div class="flex gap-2">
            <app-button 
              variant="outline" 
              icon="filter_list" 
              (onClick)="showFilters.set(!showFilters())"
              [class.bg-surface-50]="showFilters()"
            >
              Filtros Avançados
            </app-button>
          </div>
        </div>

        <!-- Advanced Filters Panel -->
        @if (showFilters()) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-surface-100 mt-2">
            <div>
              <label class="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Categoria</label>
              <select 
                [(ngModel)]="filter().category" 
                (ngModelChange)="onFilterChange()"
                class="block w-full py-2 px-3 border border-surface-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option [value]="undefined">Todas</option>
                @for (cat of categories(); track cat.id) {
                  <option [value]="cat.name">{{ cat.name }}</option>
                }
              </select>
            </div>
            
            <div>
              <label class="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Artista</label>
              <select 
                [(ngModel)]="filter().artist" 
                (ngModelChange)="onFilterChange()"
                class="block w-full py-2 px-3 border border-surface-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option [value]="undefined">Todos</option>
                @for (artist of artists(); track artist) {
                  <option [value]="artist">{{ artist }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Instrumento</label>
              <select 
                [(ngModel)]="filter().instrument" 
                (ngModelChange)="onFilterChange()"
                class="block w-full py-2 px-3 border border-surface-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option [value]="undefined">Todos</option>
                @for (inst of instruments(); track inst) {
                  <option [value]="inst">{{ inst }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Dificuldade</label>
              <select 
                [(ngModel)]="filter().difficulty" 
                (ngModelChange)="onFilterChange()"
                class="block w-full py-2 px-3 border border-surface-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option [value]="undefined">Todas</option>
                <option value="easy">Fácil</option>
                <option value="medium">Média</option>
                <option value="hard">Difícil</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Material</label>
              <select 
                [(ngModel)]="filter().materialType" 
                (ngModelChange)="onFilterChange()"
                class="block w-full py-2 px-3 border border-surface-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option [value]="undefined">Todos</option>
                <option value="sheet">Partitura</option>
                <option value="chords">Cifra</option>
                <option value="kit">Kit de Ensaio</option>
                <option value="playback">Playback</option>
                <option value="musicxml">MusicXML</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          
          <div class="flex justify-end pt-2">
            <button 
              (click)="clearFilters()"
              class="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        }
      </div>

      <!-- Content Area -->
      @if (isLoading()) {
        <div class="flex justify-center p-12">
          <mat-icon class="animate-spin text-primary-500 text-[40px] w-[40px] h-[40px]">refresh</mat-icon>
        </div>
      } @else if (paginatedData()?.data?.length === 0) {
        <app-empty-state 
          icon="search_off" 
          title="Nenhuma partitura encontrada" 
          description="Tente ajustar seus filtros ou buscar por outros termos."
        >
          <app-button variant="outline" (onClick)="clearFilters()">Limpar Filtros</app-button>
        </app-empty-state>
      } @else {
        
        @if (viewMode() === 'grid') {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (sheet of paginatedData()?.data; track sheet.id) {
              <app-sheet-card 
                [sheet]="sheet"
                (toggleFavorite)="onToggleFavorite($event)"
                (viewDetails)="onViewDetails($event)"
              ></app-sheet-card>
            }
          </div>
        } @else {
          <div class="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <app-table [columns]="columns" [data]="paginatedData()?.data || []">
              <ng-template #cellTemplate let-row let-col="column">
                @switch (col.key) {
                  @case ('title') {
                    <div class="flex items-center gap-3">
                      <img [src]="row.thumbnailUrl" class="w-10 h-10 rounded-lg object-cover bg-surface-100" referrerpolicy="no-referrer" />
                      <div>
                        <div class="font-bold text-surface-900 flex items-center gap-2">
                          {{ row.title }}
                          @if (row.isPremium) {
                            <mat-icon class="text-warning-500 text-[14px] w-[14px] h-[14px]" title="Premium">star</mat-icon>
                          }
                        </div>
                        <div class="text-xs text-surface-500">{{ row.artist }}</div>
                      </div>
                    </div>
                  }
                  @case ('category') {
                    <span class="text-sm font-medium text-surface-600">{{ row.category }}</span>
                  }
                  @case ('instrument') {
                    <span class="text-sm text-surface-600">{{ row.instrument }}</span>
                  }
                  @case ('materialTypes') {
                    <div class="flex flex-wrap gap-1">
                      @for (type of row.materialTypes.slice(0, 2); track type) {
                        <app-badge variant="primary" class="text-[10px] px-1.5 py-0">{{ type }}</app-badge>
                      }
                      @if (row.materialTypes.length > 2) {
                        <app-badge variant="secondary" class="text-[10px] px-1.5 py-0">+{{ row.materialTypes.length - 2 }}</app-badge>
                      }
                    </div>
                  }
                  @case ('difficulty') {
                    <app-badge [variant]="getDifficultyVariant(row.difficulty)">{{ row.difficulty }}</app-badge>
                  }
                  @case ('actions') {
                    <div class="flex items-center gap-2">
                      <button 
                        (click)="onToggleFavorite(row)"
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-surface-400 hover:bg-surface-100 hover:text-red-500 transition-colors"
                      >
                        <mat-icon class="text-[18px] w-[18px] h-[18px]" [class.text-red-500]="row.isFavorite">{{ row.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
                      </button>
                      <button 
                        (click)="onViewDetails(row)"
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-surface-400 hover:bg-surface-100 hover:text-primary-600 transition-colors"
                      >
                        <mat-icon class="text-[18px] w-[18px] h-[18px]">visibility</mat-icon>
                      </button>
                    </div>
                  }
                  @default {
                    {{ row[col.key] }}
                  }
                }
              </ng-template>
            </app-table>
          </div>
        }

        <!-- Pagination -->
        @if (paginatedData()?.totalPages! > 1) {
          <div class="flex items-center justify-between bg-white px-4 py-3 border border-surface-200 rounded-xl mt-4">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-surface-700">
                  Mostrando <span class="font-medium">{{ ((paginatedData()?.page! - 1) * paginatedData()?.pageSize!) + 1 }}</span> a 
                  <span class="font-medium">{{ Math.min(paginatedData()?.page! * paginatedData()?.pageSize!, paginatedData()?.total!) }}</span> de 
                  <span class="font-medium">{{ paginatedData()?.total }}</span> resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button 
                    [disabled]="paginatedData()?.page === 1"
                    (click)="changePage(paginatedData()?.page! - 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-surface-300 bg-white text-sm font-medium text-surface-500 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Anterior</span>
                    <mat-icon class="h-5 w-5">chevron_left</mat-icon>
                  </button>
                  
                  @for (p of [].constructor(paginatedData()?.totalPages); track $index) {
                    <button 
                      (click)="changePage($index + 1)"
                      [class]="'relative inline-flex items-center px-4 py-2 border text-sm font-medium ' + 
                        (paginatedData()?.page === ($index + 1) 
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' 
                          : 'bg-white border-surface-300 text-surface-500 hover:bg-surface-50')"
                    >
                      {{ $index + 1 }}
                    </button>
                  }

                  <button 
                    [disabled]="paginatedData()?.page === paginatedData()?.totalPages"
                    (click)="changePage(paginatedData()?.page! + 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-300 bg-white text-sm font-medium text-surface-500 hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Próximo</span>
                    <mat-icon class="h-5 w-5">chevron_right</mat-icon>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        }
      }
    </div>

    <!-- Add Modal -->
    <app-modal 
      [isOpen]="isModalOpen()" 
      title="Adicionar Nova Partitura" 
      (close)="closeAddModal()"
    >
      <div class="flex flex-col gap-4 py-2">
        <app-input label="Título da Música" placeholder="Ex: Castelo Forte"></app-input>
        <app-input label="Artista / Compositor" placeholder="Ex: Hinário Adventista"></app-input>
        <div class="grid grid-cols-2 gap-4">
          <app-input label="Categoria" placeholder="Ex: Hinos"></app-input>
          <app-input label="Dificuldade" placeholder="Ex: medium"></app-input>
        </div>
      </div>
      <div modal-footer class="flex justify-end gap-3 w-full">
        <app-button variant="ghost" (onClick)="closeAddModal()">Cancelar</app-button>
        <app-button (onClick)="closeAddModal()">Salvar Partitura</app-button>
      </div>
    </app-modal>
  `
})
export class SheetsComponent implements OnInit {
  private sheetService = inject(SheetMusicService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  Math = Math; // Expose Math to template

  paginatedData = signal<PaginatedResult<SheetMusic> | null>(null);
  isLoading = signal(true);
  isModalOpen = signal(false);
  viewMode = signal<'grid' | 'table'>('grid');
  showFilters = signal(false);

  categories = signal<Category[]>([]);
  artists = signal<string[]>([]);
  instruments = signal<string[]>([]);

  filter = signal<SheetFilter>({
    page: 1,
    pageSize: 8,
    query: '',
    category: undefined,
    artist: undefined,
    instrument: undefined,
    difficulty: undefined,
    materialType: undefined
  });

  columns: TableColumn[] = [
    { key: 'title', label: 'Música' },
    { key: 'category', label: 'Categoria' },
    { key: 'instrument', label: 'Instrumento' },
    { key: 'materialTypes', label: 'Materiais' },
    { key: 'difficulty', label: 'Dificuldade' },
    { key: 'actions', label: 'Ações' }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.filter.update(f => ({ ...f, category: params['category'] }));
        this.showFilters.set(true);
      }
      this.loadFilterData();
      this.loadSheets();
    });
  }

  loadFilterData() {
    this.sheetService.getCategories().subscribe(cats => this.categories.set(cats));
    this.sheetService.getFiltersData().subscribe(data => {
      this.artists.set(data.artists);
      this.instruments.set(data.instruments);
    });
  }

  loadSheets() {
    this.isLoading.set(true);
    this.sheetService.getSheets(this.filter()).subscribe(data => {
      this.paginatedData.set(data);
      this.isLoading.set(false);
    });
  }

  onFilterChange() {
    this.filter.update(f => ({ ...f, page: 1 })); // Reset to page 1 on filter change
    this.loadSheets();
  }

  clearFilters() {
    this.filter.set({
      page: 1,
      pageSize: 8,
      query: '',
      category: undefined,
      artist: undefined,
      instrument: undefined,
      difficulty: undefined,
      materialType: undefined
    });
    this.loadSheets();
  }

  changePage(newPage: number) {
    this.filter.update(f => ({ ...f, page: newPage }));
    this.loadSheets();
  }

  onToggleFavorite(sheet: SheetMusic) {
    // Mock toggle favorite
    sheet.isFavorite = !sheet.isFavorite;
  }

  onViewDetails(sheet: SheetMusic) {
    this.router.navigate(['/sheets', sheet.id]);
  }

  openAddModal() {
    this.isModalOpen.set(true);
  }

  closeAddModal() {
    this.isModalOpen.set(false);
  }

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'success';
    }
  }
}
