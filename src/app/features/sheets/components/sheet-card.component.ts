import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-sheet-card',
  standalone: true,
  imports: [MatIconModule, BadgeComponent, ButtonComponent],
  template: `
    <div class="bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-surface-300 cursor-pointer p-0 flex flex-col h-full group relative">
      <!-- Premium/Free Badge -->
      <div class="absolute top-3 left-3 z-10">
        @if (sheet().isPremium) {
          <app-badge variant="warning" class="shadow-sm flex items-center gap-1">
            <mat-icon class="text-[14px] w-[14px] h-[14px]">star</mat-icon> Premium
          </app-badge>
        } @else {
          <app-badge variant="success" class="shadow-sm">Grátis</app-badge>
        }
      </div>

      <div class="relative h-48 bg-surface-100 overflow-hidden">
        <img [src]="sheet().thumbnailUrl" [alt]="sheet().title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerpolicy="no-referrer" />
        
        <!-- Overlay for material types -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-12 flex flex-wrap gap-1">
          @for (type of sheet().materialTypes; track type) {
            <span class="text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
              {{ type }}
            </span>
          }
        </div>

        <button 
          (click)="toggleFavorite.emit(sheet())"
          class="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-surface-400 hover:text-red-500 transition-colors z-10"
        >
          <mat-icon [class.text-red-500]="sheet().isFavorite">{{ sheet().isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>
      
      <div class="p-5 flex-1 flex flex-col">
        <div class="flex justify-between items-start mb-1">
          <div class="text-xs font-bold text-primary-600 uppercase tracking-wider">{{ sheet().category }}</div>
          <app-badge [variant]="getDifficultyVariant(sheet().difficulty)" class="text-[10px] px-1.5 py-0">{{ sheet().difficulty }}</app-badge>
        </div>
        
        <h3 class="text-lg font-bold text-surface-900 mb-1 line-clamp-1" [title]="sheet().title">{{ sheet().title }}</h3>
        <p class="text-sm font-medium text-surface-500 mb-2 line-clamp-1">{{ sheet().artist }}</p>
        
        <div class="flex items-center text-xs text-surface-500 mb-4 mt-auto">
          <mat-icon class="text-[16px] w-[16px] h-[16px] mr-1">piano</mat-icon>
          <span class="truncate">{{ sheet().instrument }}</span>
        </div>
        
        <div class="mt-auto pt-4 border-t border-surface-100">
          <app-button variant="outline" [fullWidth]="true" size="sm" icon="visibility" (onClick)="viewDetails.emit(sheet())">Ver Detalhes</app-button>
        </div>
      </div>
    </div>
  `
})
export class SheetCardComponent {
  sheet = input.required<SheetMusic>();
  toggleFavorite = output<SheetMusic>();
  viewDetails = output<SheetMusic>();

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'success';
    }
  }
}
