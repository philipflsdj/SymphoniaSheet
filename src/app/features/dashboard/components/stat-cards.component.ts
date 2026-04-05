import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-stat-cards',
  standalone: true,
  imports: [MatIconModule, CardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      @for (stat of stats(); track stat.title) {
        <app-card padding="md" class="flex items-center gap-4">
          <div [class]="'w-12 h-12 rounded-xl flex items-center justify-center ' + stat.colorClass">
            <mat-icon>{{ stat.icon }}</mat-icon>
          </div>
          <div>
            <p class="text-sm font-medium text-surface-500">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-surface-900">{{ stat.value }}</p>
          </div>
        </app-card>
      }
    </div>
  `
})
export class StatCardsComponent {
  stats = input.required<{title: string, value: string | number, icon: string, colorClass: string}[]>();
}
