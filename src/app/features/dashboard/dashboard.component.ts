import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusicService } from '../../core/services/sheet-music.service';
import { SheetMusic } from '../../core/models/sheet-music.model';
import { Category } from '../../core/models/category.model';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatCardsComponent } from './components/stat-cards.component';
import { QuickActionsComponent } from './components/quick-actions.component';
import { SheetListHorizontalComponent } from './components/sheet-list-horizontal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule, 
    BadgeComponent, 
    ButtonComponent, 
    EmptyStateComponent,
    StatCardsComponent,
    QuickActionsComponent,
    SheetListHorizontalComponent,
    RouterLink
  ],
  template: `
    <div class="flex flex-col gap-8">
      
      <!-- Welcome Section -->
      <section class="bg-primary-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div class="relative z-10 max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-extrabold mb-4">Bem-vindo de volta! 🎵</h1>
          <p class="text-primary-100 text-lg mb-6">Pronto para o próximo ensaio? Explore novas partituras ou continue de onde parou.</p>
          <app-button variant="secondary" size="lg" icon="search" routerLink="/sheets">Explorar Acervo</app-button>
        </div>
        <!-- Decorative elements -->
        <mat-icon class="absolute -right-10 -bottom-10 text-[200px] w-[200px] h-[200px] text-primary-500 opacity-50 transform -rotate-12">music_note</mat-icon>
      </section>

      <!-- Stat Cards -->
      <app-stat-cards [stats]="dashboardStats"></app-stat-cards>

      <div class="grid lg:grid-cols-3 gap-8">
        
        <!-- Main Content Column (2/3) -->
        <div class="lg:col-span-2 flex flex-col gap-8">
          
          <app-quick-actions></app-quick-actions>

          <!-- Recent Sheets -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-surface-900">Adicionados Recentemente</h2>
              <button class="text-primary-600 font-bold text-sm hover:underline" routerLink="/sheets">Ver todos</button>
            </div>

            @if (isLoading()) {
              <div class="flex justify-center p-12">
                <mat-icon class="animate-spin text-primary-500 text-[40px] w-[40px] h-[40px]">refresh</mat-icon>
              </div>
            } @else if (recentSheets().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                @for (sheet of recentSheets().slice(0, 4); track sheet.id) {
                  <div [routerLink]="['/sheets', sheet.id]" class="bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-surface-300 cursor-pointer p-0 flex flex-col h-full">
                    <div class="relative h-40 bg-surface-100">
                      <img [src]="sheet.thumbnailUrl" [alt]="sheet.title" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
                      <div class="absolute top-3 right-3 flex gap-2">
                        <app-badge [variant]="getDifficultyVariant(sheet.difficulty)">{{ sheet.difficulty }}</app-badge>
                      </div>
                      <button class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-surface-400 hover:text-red-500 transition-colors" (click)="$event.stopPropagation()">
                        <mat-icon [class.text-red-500]="sheet.isFavorite">{{ sheet.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
                      </button>
                    </div>
                    <div class="p-4 flex-1 flex flex-col">
                      <div class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{{ sheet.category }}</div>
                      <h3 class="text-lg font-bold text-surface-900 mb-1 line-clamp-1">{{ sheet.title }}</h3>
                      <p class="text-sm font-medium text-surface-500 mb-4">{{ sheet.artist }}</p>
                      <div class="mt-auto">
                        <app-button variant="outline" [fullWidth]="true" size="sm" icon="visibility">Visualizar</app-button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <app-empty-state 
                icon="library_music" 
                title="Nenhuma partitura encontrada" 
                description="O acervo está vazio no momento. Volte mais tarde!"
              ></app-empty-state>
            }
          </section>

        </div>

        <!-- Sidebar Column (1/3) -->
        <div class="flex flex-col gap-8">
          
          <!-- Most Accessed -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-surface-900">Mais Acessadas</h2>
            </div>
            @if (isLoading()) {
              <div class="flex justify-center p-6">
                <mat-icon class="animate-spin text-primary-500">refresh</mat-icon>
              </div>
            } @else {
              <app-sheet-list-horizontal [sheets]="mostAccessedSheets()"></app-sheet-list-horizontal>
            }
          </section>

          <!-- Favorites -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-surface-900">Meus Favoritos</h2>
              <button class="text-primary-600 font-bold text-sm hover:underline">Ver todos</button>
            </div>
            @if (isLoading()) {
              <div class="flex justify-center p-6">
                <mat-icon class="animate-spin text-primary-500">refresh</mat-icon>
              </div>
            } @else {
              <app-sheet-list-horizontal [sheets]="favoriteSheets().slice(0, 3)"></app-sheet-list-horizontal>
            }
          </section>

        </div>
      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  private sheetService = inject(SheetMusicService);

  recentSheets = signal<SheetMusic[]>([]);
  favoriteSheets = signal<SheetMusic[]>([]);
  mostAccessedSheets = signal<SheetMusic[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal(true);

  dashboardStats = [
    { title: 'Total de Partituras', value: '1.245', icon: 'library_music', colorClass: 'bg-primary-100 text-primary-600' },
    { title: 'Meus Favoritos', value: '32', icon: 'favorite', colorClass: 'bg-rose-100 text-rose-600' },
    { title: 'Repertórios', value: '8', icon: 'queue_music', colorClass: 'bg-emerald-100 text-emerald-600' },
    { title: 'Downloads', value: '156', icon: 'download', colorClass: 'bg-amber-100 text-amber-600' },
  ];

  ngOnInit() {
    this.sheetService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });

    this.sheetService.getRecentSheets().subscribe(sheets => {
      this.recentSheets.set(sheets);
      this.checkLoading();
    });

    this.sheetService.getFavoriteSheets().subscribe(sheets => {
      this.favoriteSheets.set(sheets);
      this.checkLoading();
    });

    this.sheetService.getMostAccessedSheets().subscribe(sheets => {
      this.mostAccessedSheets.set(sheets);
      this.checkLoading();
    });
  }

  private checkLoading() {
    if (this.recentSheets().length > 0 && this.favoriteSheets().length > 0 && this.mostAccessedSheets().length > 0) {
      this.isLoading.set(false);
    }
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
