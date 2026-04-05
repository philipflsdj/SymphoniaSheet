import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-plan-selection',
  standalone: true,
  imports: [MatIconModule, ButtonComponent, CardComponent, BadgeComponent],
  template: `
    <div class="min-h-screen bg-surface-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-primary-600 font-bold tracking-wide uppercase text-sm mb-2">Planos</h2>
          <h1 class="text-4xl font-extrabold text-surface-900 sm:text-5xl mb-4">
            Escolha o plano ideal para você
          </h1>
          <p class="text-xl text-surface-500">
            Comece de graça ou desbloqueie todos os recursos para elevar seu ministério musical.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <!-- Free Plan -->
          <app-card padding="lg" class="relative flex flex-col h-full border-2 border-transparent">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-surface-900">Básico</h3>
              <p class="text-surface-500 mt-2">Perfeito para quem está começando.</p>
            </div>
            
            <div class="mb-6 flex items-baseline text-surface-900">
              <span class="text-5xl font-extrabold tracking-tight">R$ 0</span>
              <span class="text-xl font-medium text-surface-500 ml-1">/mês</span>
            </div>

            <ul class="flex-1 space-y-4 mb-8">
              <li class="flex items-start">
                <mat-icon class="text-emerald-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-600">Acesso a 50 partituras por mês</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-emerald-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-600">Visualização online</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-emerald-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-600">Criação de 1 repertório</span>
              </li>
              <li class="flex items-start opacity-50">
                <mat-icon class="text-surface-300 mr-3">cancel</mat-icon>
                <span class="text-surface-500 line-through">Transposição de tom</span>
              </li>
              <li class="flex items-start opacity-50">
                <mat-icon class="text-surface-300 mr-3">cancel</mat-icon>
                <span class="text-surface-500 line-through">Download em PDF</span>
              </li>
            </ul>

            <app-button 
              variant="outline" 
              [fullWidth]="true" 
              size="lg"
              [disabled]="isLoading()"
              (onClick)="selectPlan('free')"
            >
              Começar Grátis
            </app-button>
          </app-card>

          <!-- Premium Plan -->
          <app-card padding="lg" class="relative flex flex-col h-full border-2 border-primary-500 shadow-xl transform md:-translate-y-4">
            <div class="absolute top-0 right-6 transform -translate-y-1/2">
              <app-badge variant="primary" class="text-sm px-3 py-1">Mais Popular</app-badge>
            </div>

            <div class="mb-6">
              <h3 class="text-2xl font-bold text-primary-600">Premium</h3>
              <p class="text-surface-500 mt-2">Para músicos e líderes engajados.</p>
            </div>
            
            <div class="mb-6 flex items-baseline text-surface-900">
              <span class="text-5xl font-extrabold tracking-tight">R$ 19</span>
              <span class="text-xl font-medium text-surface-500 ml-1">,90/mês</span>
            </div>

            <ul class="flex-1 space-y-4 mb-8">
              <li class="flex items-start">
                <mat-icon class="text-primary-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-900 font-medium">Acesso ilimitado ao acervo</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-primary-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-900 font-medium">Repertórios ilimitados</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-primary-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-900 font-medium">Transposição de tom inteligente</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-primary-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-900 font-medium">Download em PDF e offline</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-primary-500 mr-3">check_circle</mat-icon>
                <span class="text-surface-900 font-medium">Kits de ensaio em áudio</span>
              </li>
            </ul>

            <app-button 
              variant="primary" 
              [fullWidth]="true" 
              size="lg"
              [disabled]="isLoading()"
              (onClick)="selectPlan('premium')"
            >
              @if (isLoading()) {
                <mat-icon class="animate-spin mr-2">refresh</mat-icon> Processando...
              } @else {
                Assinar Premium
              }
            </app-button>
          </app-card>

        </div>
      </div>
    </div>
  `
})
export class PlanSelectionComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  selectPlan(plan: 'free' | 'premium') {
    this.isLoading.set(true);
    this.authService.updatePlan(plan).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
