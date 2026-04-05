import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  template: `
    <div class="relative w-full max-w-md hidden md:block">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <mat-icon class="text-surface-400">search</mat-icon>
      </div>
      <input
        type="text"
        [(ngModel)]="searchQuery"
        class="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-xl leading-5 bg-surface-50 placeholder-surface-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
        placeholder="Buscar partituras, artistas, categorias..."
      />
      @if (searchQuery()) {
        <button 
          (click)="clearSearch()"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600"
        >
          <mat-icon class="text-[18px] w-[18px] h-[18px]">close</mat-icon>
        </button>
      }
    </div>
  `
})
export class SearchBarComponent {
  searchQuery = signal('');

  clearSearch() {
    this.searchQuery.set('');
  }
}
