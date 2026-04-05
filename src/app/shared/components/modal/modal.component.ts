import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatIconModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-surface-900/40 backdrop-blur-sm transition-opacity"
          (click)="close.emit()"
        ></div>

        <!-- Modal Panel -->
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Header -->
          <div class="px-6 py-4 border-b border-surface-200 flex items-center justify-between">
            <h3 class="text-lg font-bold text-surface-900">{{ title() }}</h3>
            <button 
              (click)="close.emit()"
              class="w-8 h-8 flex items-center justify-center rounded-full text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
            >
              <mat-icon class="text-[20px] w-[20px] h-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 overflow-y-auto">
            <ng-content></ng-content>
          </div>

          <!-- Footer -->
          @if (showFooter()) {
            <div class="px-6 py-4 bg-surface-50 border-t border-surface-200 flex items-center justify-end gap-3">
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  showFooter = input<boolean>(true);
  
  close = output<void>();
}
