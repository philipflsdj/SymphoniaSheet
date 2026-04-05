import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';

@Component({
  selector: 'app-sheet-player-fake',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="bg-surface-900 rounded-2xl overflow-hidden flex flex-col border border-surface-800 shadow-xl relative">
      <!-- Player Toolbar -->
      <div class="bg-surface-800 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-surface-700">
        
        <!-- Playback Controls -->
        <div class="flex items-center gap-2">
          <button class="w-10 h-10 rounded-full flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors">
            <mat-icon>skip_previous</mat-icon>
          </button>
          <button class="w-12 h-12 rounded-full flex items-center justify-center bg-primary-600 text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20">
            <mat-icon class="text-[28px] w-[28px] h-[28px]">play_arrow</mat-icon>
          </button>
          <button class="w-10 h-10 rounded-full flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors">
            <mat-icon>skip_next</mat-icon>
          </button>
        </div>

        <!-- Progress -->
        <div class="flex-1 min-w-[200px] flex items-center gap-3">
          <span class="text-xs font-mono text-surface-400">00:00</span>
          <div class="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden relative cursor-pointer group">
            <div class="absolute top-0 left-0 h-full bg-primary-500 w-0 group-hover:bg-primary-400 transition-colors"></div>
            <!-- Fake playhead -->
            <div class="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span class="text-xs font-mono text-surface-400">03:45</span>
        </div>

        <!-- AlphaTab Controls -->
        <div class="flex items-center gap-2">
          <button class="w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors" title="Metrônomo">
            <mat-icon>metronome</mat-icon>
          </button>
          <button class="w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors" title="Velocidade">
            <mat-icon>speed</mat-icon>
          </button>
          <button class="w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors" title="Loop">
            <mat-icon>loop</mat-icon>
          </button>
          <div class="w-px h-6 bg-surface-700 mx-1"></div>
          <button class="w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors" title="Imprimir">
            <mat-icon>print</mat-icon>
          </button>
          <button class="w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700 transition-colors" title="Tela Cheia">
            <mat-icon>fullscreen</mat-icon>
          </button>
        </div>
      </div>

      <!-- Sheet Music Area (Fake AlphaTab Container) -->
      <div class="bg-white p-8 min-h-[600px] flex flex-col items-center justify-center relative overflow-auto">
        <!-- Placeholder for AlphaTab rendering -->
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-surface-50/80 backdrop-blur-sm z-10">
          <mat-icon class="text-[64px] w-[64px] h-[64px] text-surface-300 mb-4">music_note</mat-icon>
          <h3 class="text-xl font-bold text-surface-700 mb-2">Visualizador de Partitura</h3>
          <p class="text-surface-500 text-center max-w-md">
            Esta área está preparada para a integração com o AlphaTab. 
            A partitura "{{ sheet().title }}" será renderizada aqui.
          </p>
          <div class="mt-6 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-mono border border-primary-200">
            // TODO: Initialize AlphaTab with sheet().fileUrl
          </div>
        </div>

        <!-- Fake sheet music background pattern -->
        <div class="w-full max-w-4xl opacity-10 pointer-events-none">
          @for (i of [1,2,3,4,5]; track i) {
            <div class="mb-12">
              <div class="h-px bg-black mb-2"></div>
              <div class="h-px bg-black mb-2"></div>
              <div class="h-px bg-black mb-2"></div>
              <div class="h-px bg-black mb-2"></div>
              <div class="h-px bg-black"></div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class SheetPlayerFakeComponent {
  sheet = input.required<SheetMusic>();
}
