import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-sheet-comments',
  standalone: true,
  imports: [MatIconModule, ButtonComponent],
  template: `
    <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
      <h3 class="text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
        <mat-icon class="text-primary-500">forum</mat-icon>
        Comentários ({{ comments.length }})
      </h3>

      <!-- Add Comment -->
      <div class="flex gap-4 mb-8">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" alt="User" class="w-10 h-10 rounded-full bg-surface-100 shrink-0" referrerpolicy="no-referrer" />
        <div class="flex-1">
          <textarea 
            class="w-full rounded-xl border-surface-300 focus:border-primary-500 focus:ring-primary-500 resize-none p-3 text-sm transition-colors" 
            rows="3" 
            placeholder="Deixe seu comentário sobre esta partitura..."
          ></textarea>
          <div class="flex justify-end mt-2">
            <app-button size="sm">Comentar</app-button>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-6">
        @for (comment of comments; track comment.id) {
          <div class="flex gap-4">
            <img [src]="comment.avatarUrl" [alt]="comment.author" class="w-10 h-10 rounded-full bg-surface-100 shrink-0" referrerpolicy="no-referrer" />
            <div class="flex-1">
              <div class="bg-surface-50 rounded-2xl rounded-tl-none p-4">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-surface-900 text-sm">{{ comment.author }}</span>
                  <span class="text-xs text-surface-400">{{ comment.date }}</span>
                </div>
                <p class="text-surface-700 text-sm leading-relaxed">{{ comment.content }}</p>
              </div>
              
              <!-- Comment Actions -->
              <div class="flex items-center gap-4 mt-2 ml-2">
                <button class="flex items-center gap-1 text-xs font-medium text-surface-500 hover:text-primary-600 transition-colors">
                  <mat-icon class="text-[14px] w-[14px] h-[14px]">thumb_up</mat-icon>
                  {{ comment.likes }}
                </button>
                <button class="text-xs font-medium text-surface-500 hover:text-primary-600 transition-colors">
                  Responder
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class SheetCommentsComponent {
  sheetId = input.required<string>();

  comments = [
    {
      id: '1',
      author: 'Maria Silva',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      content: 'Excelente arranjo! Os acordes estão muito bem colocados e a melodia flui perfeitamente. Vai ser ótimo para o culto de domingo.',
      date: 'Há 2 dias',
      likes: 12
    },
    {
      id: '2',
      author: 'Pedro Santos',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      content: 'Alguém sabe me dizer se tem a versão para saxofone alto? O arranjo de piano está impecável.',
      date: 'Há 5 dias',
      likes: 3
    },
    {
      id: '3',
      author: 'Ana Clara',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      content: 'Muito bom! Estava procurando essa partitura há meses. Obrigado por compartilhar.',
      date: 'Há 1 semana',
      likes: 8
    }
  ];
}
