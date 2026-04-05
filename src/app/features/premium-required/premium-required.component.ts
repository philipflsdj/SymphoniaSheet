import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-premium-required',
  standalone: true,
  imports: [MatIconModule, ButtonComponent],
  template: `
    <div class="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div class="w-24 h-24 bg-warning-100 text-warning-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <mat-icon class="text-[48px] w-[48px] h-[48px]">workspace_premium</mat-icon>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-extrabold text-surface-900 mb-4">Recurso Premium</h1>
      
      <p class="text-lg text-surface-600 max-w-xl mb-8 leading-relaxed">
        O conteúdo que você está tentando acessar é exclusivo para assinantes do Symphonia Sheet. 
        Faça o upgrade agora para ter acesso ilimitado a todo o nosso acervo e recursos avançados.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4">
        <app-button variant="outline" size="lg" (onClick)="goBack()">Voltar</app-button>
        <app-button size="lg" icon="star" (onClick)="goToPlans()">Ver Planos</app-button>
      </div>
      
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl text-left">
        <div class="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <mat-icon class="text-primary-500 mb-3">library_music</mat-icon>
          <h3 class="font-bold text-surface-900 mb-2">Acervo Completo</h3>
          <p class="text-sm text-surface-500">Acesso a milhares de partituras exclusivas e arranjos profissionais.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <mat-icon class="text-primary-500 mb-3">download</mat-icon>
          <h3 class="font-bold text-surface-900 mb-2">Downloads Ilimitados</h3>
          <p class="text-sm text-surface-500">Baixe PDFs, MusicXML e playbacks sem restrições.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <mat-icon class="text-primary-500 mb-3">tune</mat-icon>
          <h3 class="font-bold text-surface-900 mb-2">Player Avançado</h3>
          <p class="text-sm text-surface-500">Controle de andamento, transposição e loop no AlphaTab.</p>
        </div>
      </div>
    </div>
  `
})
export class PremiumRequiredComponent {
  private router = inject(Router);

  goBack() {
    window.history.back();
  }

  goToPlans() {
    this.router.navigate(['/plans']);
  }
}
