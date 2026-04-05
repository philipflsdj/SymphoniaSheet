import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';

interface RehearsalTrack {
  id: string;
  name: string;
  type: 'soprano' | 'alto' | 'tenor' | 'bass' | 'playback' | 'full';
  url: string;
}

@Component({
  selector: 'app-sheet-rehearsal-kit',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-xl font-bold text-surface-900">Kit de Ensaio</h3>
          <p class="text-surface-500 text-sm mt-1">Áudios separados por voz para facilitar o seu estudo.</p>
        </div>
        <div class="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <mat-icon class="text-[18px] w-[18px] h-[18px]">headphones</mat-icon>
          {{ tracks.length }} faixas
        </div>
      </div>

      <div class="space-y-3">
        @for (track of tracks; track track.id) {
          <div class="flex items-center gap-4 p-4 rounded-xl border border-surface-100 bg-surface-50 hover:bg-white hover:border-primary-200 transition-colors group">
            
            <!-- Play/Pause Button -->
            <button 
              (click)="togglePlay(track)"
              class="w-12 h-12 rounded-full bg-white border border-surface-200 flex items-center justify-center text-primary-600 shadow-sm group-hover:bg-primary-50 group-hover:border-primary-200 transition-all"
            >
              <mat-icon>{{ activeTrackId() === track.id && isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
            </button>

            <!-- Track Info -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-surface-900">{{ track.name }}</h4>
                <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md" [ngClass]="getBadgeClass(track.type)">
                  {{ track.type }}
                </span>
              </div>
              
              <!-- Progress Bar (Fake for UI) -->
              <div class="mt-2 flex items-center gap-2">
                <span class="text-xs text-surface-400 font-mono w-8">{{ activeTrackId() === track.id && isPlaying() ? '0:45' : '0:00' }}</span>
                <div class="flex-1 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-primary-500 rounded-full transition-all duration-1000"
                    [style.width]="activeTrackId() === track.id && isPlaying() ? '30%' : '0%'"
                  ></div>
                </div>
                <span class="text-xs text-surface-400 font-mono w-8">3:20</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="w-8 h-8 rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 flex items-center justify-center transition-colors" title="Baixar áudio">
                <mat-icon class="text-[20px] w-[20px] h-[20px]">download</mat-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class SheetRehearsalKitComponent {
  @Input({ required: true }) sheet!: SheetMusic;

  activeTrackId = signal<string | null>(null);
  isPlaying = signal(false);

  // Mock tracks for the UI
  tracks: RehearsalTrack[] = [
    { id: '1', name: 'Voz: Soprano', type: 'soprano', url: '#' },
    { id: '2', name: 'Voz: Contralto', type: 'alto', url: '#' },
    { id: '3', name: 'Voz: Tenor', type: 'tenor', url: '#' },
    { id: '4', name: 'Voz: Baixo', type: 'bass', url: '#' },
    { id: '5', name: 'Playback (Sem Vozes)', type: 'playback', url: '#' },
    { id: '6', name: 'Música Completa', type: 'full', url: '#' },
  ];

  togglePlay(track: RehearsalTrack) {
    if (this.activeTrackId() === track.id) {
      this.isPlaying.set(!this.isPlaying());
    } else {
      this.activeTrackId.set(track.id);
      this.isPlaying.set(true);
    }
  }

  getBadgeClass(type: string): string {
    switch (type) {
      case 'soprano': return 'bg-pink-100 text-pink-700';
      case 'alto': return 'bg-purple-100 text-purple-700';
      case 'tenor': return 'bg-blue-100 text-blue-700';
      case 'bass': return 'bg-emerald-100 text-emerald-700';
      case 'playback': return 'bg-slate-100 text-slate-700';
      case 'full': return 'bg-amber-100 text-amber-700';
      default: return 'bg-surface-100 text-surface-700';
    }
  }
}
