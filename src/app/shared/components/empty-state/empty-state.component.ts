import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-surface-200 border-dashed">
      <div class="h-16 w-16 bg-surface-100 rounded-full flex items-center justify-center mb-4 text-surface-400">
        <mat-icon class="text-[32px] w-[32px] h-[32px]">{{ icon() }}</mat-icon>
      </div>
      <h3 class="text-lg font-bold text-surface-900 mb-1">{{ title() }}</h3>
      <p class="text-sm text-surface-500 max-w-sm mb-6">{{ description() }}</p>
      <ng-content></ng-content>
    </div>
  `
})
export class EmptyStateComponent {
  icon = input<string>('inbox');
  title = input<string>('Nenhum resultado encontrado');
  description = input<string>('Não conseguimos encontrar o que você está procurando no momento.');
}
