import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScorePlayerComponent } from '../components/score-player/score-player.component';
import { ScorePlayerService } from '../services/score-player.service';
import { ScoreItem } from '../models/score-item.model';

@Component({
  selector: 'app-score-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScorePlayerComponent],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 md:p-12">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header / Breadcrumb -->
        <button class="flex items-center gap-2 text-slate-500 hover:text-[#6C5CE7] font-medium transition-colors mb-8 group">
          <mat-icon class="group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
          Voltar para o acervo
        </button>

        <!-- Loading State -->
        <div *ngIf="isLoading()" class="flex flex-col items-center justify-center py-32">
          <mat-icon class="animate-spin text-[#6C5CE7] text-5xl mb-4">refresh</mat-icon>
          <p class="text-slate-600 font-medium">Carregando informações da partitura...</p>
        </div>

        <!-- Content -->
        <div *ngIf="score() as data" class="flex flex-col gap-8">
          
          <!-- Informações da Música -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
            <img [src]="data.coverUrl" alt="Capa" class="w-24 h-24 rounded-2xl object-cover shadow-md border border-slate-100" referrerpolicy="no-referrer" />
            
            <div class="flex-1">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs mb-3 uppercase tracking-wider">
                <mat-icon class="text-[14px] w-[14px] h-[14px]">music_note</mat-icon> {{ data.instrument }}
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{{ data.title }}</h1>
              <p class="text-lg text-slate-500 font-medium">{{ data.artist }}</p>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold transition-colors shadow-sm">
                <mat-icon class="text-rose-500">favorite_border</mat-icon> Salvar
              </button>
              <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#6C5CE7] text-white rounded-xl hover:bg-[#5a4bcf] font-bold transition-colors shadow-md shadow-[#6C5CE7]/20">
                <mat-icon>download</mat-icon> Baixar PDF
              </button>
            </div>
          </div>

          <!-- Player AlphaTab -->
          <div class="bg-white rounded-3xl p-2 border border-slate-200/60 shadow-sm">
            <app-score-player [fileUrl]="data.fileUrl"></app-score-player>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ScoreDetailComponent implements OnInit {
  private scoreService = inject(ScorePlayerService);
  
  score = signal<ScoreItem | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    // Simula o carregamento de uma partitura específica (ex: ID 1)
    this.scoreService.getScoreDetails('1').subscribe({
      next: (data) => {
        this.score.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
        this.isLoading.set(false);
      }
    });
  }
}
