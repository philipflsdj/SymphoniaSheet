import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-sheet-list-horizontal',
  standalone: true,
  imports: [MatIconModule, BadgeComponent, RouterLink],
  template: `
    <div class="flex flex-col gap-3">
      @for (sheet of sheets(); track sheet.id) {
        <div [routerLink]="['/sheets', sheet.id]" class="bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-surface-300 cursor-pointer p-3 flex items-center gap-4">
          <img [src]="sheet.thumbnailUrl" [alt]="sheet.title" class="w-16 h-16 rounded-lg object-cover bg-surface-100" referrerpolicy="no-referrer" />
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-surface-900 truncate">{{ sheet.title }}</h4>
            <p class="text-xs text-surface-500 truncate">{{ sheet.artist }}</p>
          </div>
          <div class="hidden sm:flex flex-col items-end gap-1">
            <app-badge [variant]="getDifficultyVariant(sheet.difficulty)" class="text-[10px] px-2 py-0.5">{{ sheet.difficulty }}</app-badge>
            <span class="text-xs text-surface-400">{{ sheet.category }}</span>
          </div>
          <button class="w-8 h-8 flex items-center justify-center text-surface-400 hover:text-primary-600 transition-colors">
            <mat-icon class="text-[20px] w-[20px] h-[20px]">chevron_right</mat-icon>
          </button>
        </div>
      }
    </div>
  `
})
export class SheetListHorizontalComponent {
  sheets = input.required<SheetMusic[]>();

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'success';
    }
  }
}
