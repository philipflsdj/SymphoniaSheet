import { Component, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SheetMusic } from '../../../core/models/sheet-music.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { UserRole } from '../../../core/models/role.model';

@Component({
  selector: 'app-sheet-header',
  standalone: true,
  imports: [MatIconModule, BadgeComponent, ButtonComponent, HasRoleDirective],
  template: `
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Thumbnail -->
      <div class="w-full md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-lg bg-surface-100 relative">
        <img [src]="sheet().thumbnailUrl" [alt]="sheet().title" class="w-full aspect-[3/4] object-cover" referrerpolicy="no-referrer" />
        @if (sheet().isPremium) {
          <div class="absolute top-3 left-3">
            <app-badge variant="warning" class="shadow-sm flex items-center gap-1">
              <mat-icon class="text-[14px] w-[14px] h-[14px]">star</mat-icon> Premium
            </app-badge>
          </div>
        }
      </div>

      <!-- Details -->
      <div class="flex-1 flex flex-col min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <app-badge variant="primary">{{ sheet().category }}</app-badge>
          <app-badge [variant]="getDifficultyVariant(sheet().difficulty)">{{ sheet().difficulty }}</app-badge>
          <div class="flex items-center text-amber-500 text-sm font-medium ml-2">
            <mat-icon class="text-[18px] w-[18px] h-[18px]">star</mat-icon>
            <mat-icon class="text-[18px] w-[18px] h-[18px]">star</mat-icon>
            <mat-icon class="text-[18px] w-[18px] h-[18px]">star</mat-icon>
            <mat-icon class="text-[18px] w-[18px] h-[18px]">star</mat-icon>
            <mat-icon class="text-[18px] w-[18px] h-[18px]">star_half</mat-icon>
            <span class="text-surface-500 ml-1">(4.8)</span>
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-extrabold text-surface-900 mb-2">{{ sheet().title }}</h1>
        <p class="text-xl text-surface-600 mb-6">{{ sheet().artist }}</p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div class="flex flex-col">
            <span class="text-xs text-surface-500 uppercase tracking-wider font-bold mb-1">Instrumento</span>
            <span class="text-surface-900 font-medium flex items-center gap-1">
              <mat-icon class="text-[16px] w-[16px] h-[16px] text-surface-400">piano</mat-icon>
              {{ sheet().instrument }}
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-surface-500 uppercase tracking-wider font-bold mb-1">Páginas</span>
            <span class="text-surface-900 font-medium flex items-center gap-1">
              <mat-icon class="text-[16px] w-[16px] h-[16px] text-surface-400">description</mat-icon>
              4
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-surface-500 uppercase tracking-wider font-bold mb-1">Adicionado em</span>
            <span class="text-surface-900 font-medium flex items-center gap-1">
              <mat-icon class="text-[16px] w-[16px] h-[16px] text-surface-400">calendar_today</mat-icon>
              12/05/2023
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-surface-500 uppercase tracking-wider font-bold mb-1">Acessos</span>
            <span class="text-surface-900 font-medium flex items-center gap-1">
              <mat-icon class="text-[16px] w-[16px] h-[16px] text-surface-400">visibility</mat-icon>
              1.2k
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3 mt-auto">
          <app-button icon="play_arrow" size="lg" (onClick)="play.emit()">Tocar Agora</app-button>
          
          <ng-container *appHasRole="[UserRole.OWNER, UserRole.ADMIN, UserRole.SUBSCRIBER]">
            <app-button variant="outline" icon="download" size="lg" (onClick)="download.emit()">Baixar</app-button>
          </ng-container>
          
          <ng-container *appHasRole="[UserRole.FREE]">
            <app-button variant="primary" icon="star" size="lg" (onClick)="goToUpgrade()">Baixar (Premium)</app-button>
          </ng-container>

          <app-button 
            [variant]="sheet().isFavorite ? 'primary' : 'outline'" 
            [icon]="sheet().isFavorite ? 'favorite' : 'favorite_border'" 
            size="lg"
            (onClick)="toggleFavorite.emit()"
          >
            {{ sheet().isFavorite ? 'Favorito' : 'Favoritar' }}
          </app-button>
        </div>
      </div>
    </div>
  `
})
export class SheetHeaderComponent {
  sheet = input.required<SheetMusic>();
  
  play = output<void>();
  download = output<void>();
  toggleFavorite = output<void>();

  UserRole = UserRole;
  private router = inject(Router);

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'success';
    }
  }

  goToUpgrade() {
    this.router.navigate(['/premium-required']);
  }
}
