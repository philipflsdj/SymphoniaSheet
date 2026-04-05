import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-sheet-related',
  standalone: true,
  imports: [MatIconModule, CardComponent, BadgeComponent],
  template: `
    <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
      <h3 class="text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
        <mat-icon class="text-primary-500">library_music</mat-icon>
        Materiais Relacionados
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of relatedItems; track item.id) {
          <app-card [hoverable]="true" padding="none" class="flex flex-col h-full group relative overflow-hidden">
            <div class="relative h-32 bg-surface-100 overflow-hidden">
              <img [src]="item.thumbnailUrl" [alt]="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerpolicy="no-referrer" />
              
              <div class="absolute top-2 left-2 z-10">
                <app-badge [variant]="getDifficultyVariant(item.difficulty)" class="text-[10px] px-1.5 py-0 shadow-sm">{{ item.difficulty }}</app-badge>
              </div>
            </div>
            
            <div class="p-4 flex-1 flex flex-col">
              <div class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1">{{ item.category }}</div>
              <h4 class="text-sm font-bold text-surface-900 mb-1 line-clamp-1" [title]="item.title">{{ item.title }}</h4>
              <p class="text-xs font-medium text-surface-500 mb-2 line-clamp-1">{{ item.artist }}</p>
              
              <div class="flex items-center text-[10px] text-surface-500 mt-auto">
                <mat-icon class="text-[14px] w-[14px] h-[14px] mr-1">piano</mat-icon>
                <span class="truncate">{{ item.instrument }}</span>
              </div>
            </div>
          </app-card>
        }
      </div>
    </div>
  `
})
export class SheetRelatedComponent {
  sheet = input.required<SheetMusic>();

  // Mock related items
  relatedItems = [
    {
      id: 'r1',
      title: 'Mais Perto Quero Estar',
      artist: 'Hinário Adventista',
      category: 'Hinos',
      difficulty: 'easy',
      instrument: 'Piano',
      thumbnailUrl: 'https://picsum.photos/seed/maisperto/400/300'
    },
    {
      id: 'r2',
      title: 'Grandioso És Tu',
      artist: 'Hinário Adventista',
      category: 'Hinos',
      difficulty: 'medium',
      instrument: 'Piano e Voz',
      thumbnailUrl: 'https://picsum.photos/seed/grandioso/400/300'
    },
    {
      id: 'r3',
      title: 'Rude Cruz',
      artist: 'Hinário Adventista',
      category: 'Hinos',
      difficulty: 'hard',
      instrument: 'Órgão',
      thumbnailUrl: 'https://picsum.photos/seed/rudecruz/400/300'
    }
  ];

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'success';
    }
  }
}
