import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section>
      <h2 class="text-lg font-bold text-surface-900 mb-4">Atalhos Rápidos</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        @for (action of actions; track action.label) {
          <button class="flex flex-col items-center justify-center p-4 bg-white border border-surface-200 rounded-2xl hover:border-primary-500 hover:shadow-md transition-all group">
            <div [class]="'w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ' + action.bgClass + ' ' + action.textClass + ' group-hover:bg-primary-500 group-hover:text-white'">
              <mat-icon>{{ action.icon }}</mat-icon>
            </div>
            <span class="text-sm font-medium text-surface-700 group-hover:text-primary-600">{{ action.label }}</span>
          </button>
        }
      </div>
    </section>
  `
})
export class QuickActionsComponent {
  actions = [
    { label: 'Nova Partitura', icon: 'add_circle', bgClass: 'bg-primary-50', textClass: 'text-primary-600' },
    { label: 'Criar Repertório', icon: 'queue_music', bgClass: 'bg-emerald-50', textClass: 'text-emerald-600' },
    { label: 'Importar PDF', icon: 'picture_as_pdf', bgClass: 'bg-rose-50', textClass: 'text-rose-600' },
    { label: 'Compartilhar', icon: 'share', bgClass: 'bg-amber-50', textClass: 'text-amber-600' },
  ];
}
