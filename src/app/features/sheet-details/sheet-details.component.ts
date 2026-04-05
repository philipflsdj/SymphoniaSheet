import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusicService } from '../../core/services/sheet-music.service';
import { SheetMusic } from '../../core/models/sheet-music.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SheetHeaderComponent } from './components/sheet-header.component';
import { ScorePlayerComponent } from '../score-player/components/score-player/score-player.component';
import { SheetCommentsComponent } from './components/sheet-comments.component';
import { SheetRelatedComponent } from './components/sheet-related.component';

type Tab = 'overview' | 'sheet' | 'chords' | 'comments' | 'related';

@Component({
  selector: 'app-sheet-details',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonComponent,
    SheetHeaderComponent,
    ScorePlayerComponent,
    SheetCommentsComponent,
    SheetRelatedComponent
  ],
  template: `
    @if (isLoading()) {
      <div class="flex justify-center items-center min-h-[50vh]">
        <mat-icon class="animate-spin text-primary-500 text-[48px] w-[48px] h-[48px]">refresh</mat-icon>
      </div>
    } @else if (sheet()) {
      <div class="flex flex-col gap-8">
        
        <!-- Back Button -->
        <div>
          <button 
            (click)="goBack()"
            class="flex items-center gap-2 text-surface-500 hover:text-primary-600 font-medium transition-colors"
          >
            <mat-icon>arrow_back</mat-icon>
            Voltar para o acervo
          </button>
        </div>

        <!-- Header Section -->
        <app-sheet-header 
          [sheet]="sheet()!"
          (play)="onPlay()"
          (download)="onDownload()"
          (toggleFavorite)="onToggleFavorite()"
        ></app-sheet-header>

        <!-- Tabs Navigation -->
        <div class="border-b border-surface-200 overflow-x-auto hide-scrollbar">
          <div class="flex gap-8 min-w-max px-2">
            <button 
              (click)="activeTab.set('overview')"
              class="pb-4 text-sm font-bold transition-colors relative"
              [class.text-primary-600]="activeTab() === 'overview'"
              [class.text-surface-500]="activeTab() !== 'overview'"
            >
              Visão Geral
              @if (activeTab() === 'overview') {
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></div>
              }
            </button>
            <button 
              (click)="activeTab.set('sheet')"
              class="pb-4 text-sm font-bold transition-colors relative"
              [class.text-primary-600]="activeTab() === 'sheet'"
              [class.text-surface-500]="activeTab() !== 'sheet'"
            >
              Partitura Interativa
              @if (activeTab() === 'sheet') {
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></div>
              }
            </button>
            <button 
              (click)="activeTab.set('chords')"
              class="pb-4 text-sm font-bold transition-colors relative"
              [class.text-primary-600]="activeTab() === 'chords'"
              [class.text-surface-500]="activeTab() !== 'chords'"
            >
              Cifra
              @if (activeTab() === 'chords') {
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></div>
              }
            </button>
            <button 
              (click)="activeTab.set('comments')"
              class="pb-4 text-sm font-bold transition-colors relative flex items-center gap-2"
              [class.text-primary-600]="activeTab() === 'comments'"
              [class.text-surface-500]="activeTab() !== 'comments'"
            >
              Comentários
              <span class="bg-surface-100 text-surface-600 py-0.5 px-2 rounded-full text-[10px]">3</span>
              @if (activeTab() === 'comments') {
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></div>
              }
            </button>
            <button 
              (click)="activeTab.set('related')"
              class="pb-4 text-sm font-bold transition-colors relative"
              [class.text-primary-600]="activeTab() === 'related'"
              [class.text-surface-500]="activeTab() !== 'related'"
            >
              Materiais Relacionados
              @if (activeTab() === 'related') {
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></div>
              }
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="min-h-[400px]">
          @switch (activeTab()) {
            @case ('overview') {
              <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
                <h3 class="text-xl font-bold text-surface-900 mb-4">Sobre a Partitura</h3>
                <p class="text-surface-600 leading-relaxed mb-6">
                  Este é um arranjo especial de "{{ sheet()!.title }}" feito para {{ sheet()!.instrument }}. 
                  A partitura inclui a melodia principal, acompanhamento e cifras. Ideal para músicos de nível 
                  {{ sheet()!.difficulty === 'easy' ? 'iniciante' : sheet()!.difficulty === 'medium' ? 'intermediário' : 'avançado' }}.
                </p>
                
                <h4 class="font-bold text-surface-900 mb-3">Materiais Inclusos</h4>
                <ul class="space-y-2">
                  @for (type of sheet()!.materialTypes; track type) {
                    <li class="flex items-center gap-2 text-surface-600">
                      <mat-icon class="text-primary-500 text-[20px] w-[20px] h-[20px]">check_circle</mat-icon>
                      <span class="capitalize">{{ type }}</span>
                    </li>
                  }
                </ul>
              </div>
            }
            @case ('sheet') {
              <div class="bg-white rounded-3xl p-2 border border-surface-200/60 shadow-sm">
                <app-score-player [fileUrl]="sheet()!.fileUrl"></app-score-player>
              </div>
            }
            @case ('chords') {
              <div class="bg-white rounded-2xl border border-surface-200 p-8 shadow-sm font-mono text-lg leading-loose">
                <h3 class="text-xl font-sans font-bold text-surface-900 mb-6 border-b border-surface-200 pb-4">Cifra: {{ sheet()!.title }}</h3>
                <p class="text-primary-600 font-bold">Tom: G</p>
                <br>
                <p class="text-primary-600 font-bold">G               D/F#</p>
                <p>Castelo forte é nosso Deus</p>
                <p class="text-primary-600 font-bold">Em      C       D</p>
                <p>Espada e bom escudo</p>
                <p class="text-primary-600 font-bold">G               D/F#</p>
                <p>Com seu poder defende os seus</p>
                <p class="text-primary-600 font-bold">Em      C       D</p>
                <p>Em todo transe agudo</p>
                <br>
                <div class="bg-surface-50 p-4 rounded-xl text-sm font-sans text-surface-500 mt-8">
                  <mat-icon class="align-middle mr-2">info</mat-icon>
                  Esta é uma visualização simplificada. Baixe o PDF para a versão completa.
                </div>
              </div>
            }
            @case ('comments') {
              <app-sheet-comments [sheetId]="sheet()!.id"></app-sheet-comments>
            }
            @case ('related') {
              <app-sheet-related [sheet]="sheet()!"></app-sheet-related>
            }
          }
        </div>

      </div>
    } @else {
      <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <mat-icon class="text-[64px] w-[64px] h-[64px] text-surface-300 mb-4">error_outline</mat-icon>
        <h2 class="text-2xl font-bold text-surface-900 mb-2">Partitura não encontrada</h2>
        <p class="text-surface-500 mb-6">A partitura que você está procurando não existe ou foi removida.</p>
        <app-button (onClick)="goBack()">Voltar para o acervo</app-button>
      </div>
    }
  `
})
export class SheetDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sheetService = inject(SheetMusicService);

  sheet = signal<SheetMusic | undefined>(undefined);
  isLoading = signal(true);
  activeTab = signal<Tab>('overview');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSheet(id);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  loadSheet(id: string) {
    this.isLoading.set(true);
    this.sheetService.getSheetById(id).subscribe(sheet => {
      this.sheet.set(sheet);
      this.isLoading.set(false);
    });
  }

  goBack() {
    this.router.navigate(['/sheets']);
  }

  onPlay() {
    this.activeTab.set('sheet');
  }

  onDownload() {
    console.log('Download requested for', this.sheet()?.id);
    // TODO: Implement actual download logic
  }

  onToggleFavorite() {
    const current = this.sheet();
    if (current) {
      this.sheet.set({
        ...current,
        isFavorite: !current.isFavorite
      });
    }
  }
}
