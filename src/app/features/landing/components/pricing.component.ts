import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <section id="pricing" class="py-32 px-6 bg-white relative">
      <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter">Planos simples e transparentes</h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto font-medium">Comece de graça e faça o upgrade quando precisar de mais recursos para o seu ministério.</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          
          <!-- Free Plan -->
          <div class="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-[90%]">
            <div class="mb-8">
              <h3 class="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Free</h3>
              <p class="text-slate-500 mb-8 text-lg">Perfeito para explorar e conhecer a plataforma.</p>
              <div class="flex items-baseline gap-1">
                <span class="text-5xl font-extrabold text-slate-900 tracking-tighter">R$ 0</span>
                <span class="text-slate-500 font-medium text-lg">/mês</span>
              </div>
            </div>
            
            <ul class="space-y-5 mb-10 flex-1">
              <li class="flex items-center gap-4 text-slate-700 font-medium">
                <mat-icon class="text-emerald-500">check_circle</mat-icon> Acesso ao catálogo gratuito
              </li>
              <li class="flex items-center gap-4 text-slate-700 font-medium">
                <mat-icon class="text-emerald-500">check_circle</mat-icon> Visualização online
              </li>
              <li class="flex items-center gap-4 text-slate-700 font-medium">
                <mat-icon class="text-emerald-500">check_circle</mat-icon> Salvar favoritos
              </li>
              <li class="flex items-center gap-4 text-slate-400">
                <mat-icon>remove_circle_outline</mat-icon> Com anúncios
              </li>
              <li class="flex items-center gap-4 text-slate-400">
                <mat-icon>remove_circle_outline</mat-icon> Sem download de PDF/XML
              </li>
            </ul>
            
            <a routerLink="/register" class="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-xl transition-colors border border-slate-200 hover:border-slate-300 text-lg">
              Começar grátis
            </a>
          </div>

          <!-- Premium Plan -->
          <div class="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl shadow-[#6C5CE7]/20 flex flex-col relative transform md:scale-105 z-10">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg">
              Mais popular
            </div>
            
            <div class="mb-8">
              <h3 class="text-3xl font-extrabold text-white mb-3 tracking-tight">Premium</h3>
              <p class="text-slate-400 mb-8 text-lg">Para músicos e líderes que precisam de tudo liberado.</p>
              <div class="flex items-baseline gap-1">
                <span class="text-5xl font-extrabold text-white tracking-tighter">R$ 19,90</span>
                <span class="text-slate-400 font-medium text-lg">/mês</span>
              </div>
            </div>
            
            <ul class="space-y-5 mb-10 flex-1">
              <li class="flex items-center gap-4 text-slate-200 font-medium">
                <mat-icon class="text-[#6C5CE7]">check_circle</mat-icon> Acesso a todo o catálogo Premium
              </li>
              <li class="flex items-center gap-4 text-slate-200 font-medium">
                <mat-icon class="text-[#6C5CE7]">check_circle</mat-icon> Downloads ilimitados (PDF, XML)
              </li>
              <li class="flex items-center gap-4 text-slate-200 font-medium">
                <mat-icon class="text-[#6C5CE7]">check_circle</mat-icon> Player avançado (AlphaTab)
              </li>
              <li class="flex items-center gap-4 text-slate-200 font-medium">
                <mat-icon class="text-[#6C5CE7]">check_circle</mat-icon> Zero anúncios
              </li>
              <li class="flex items-center gap-4 text-slate-200 font-medium">
                <mat-icon class="text-[#6C5CE7]">check_circle</mat-icon> Criação de repertórios
              </li>
            </ul>
            
            <a routerLink="/register" class="block w-full text-center bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#6C5CE7]/30 hover:shadow-xl hover:shadow-[#6C5CE7]/50 hover:-translate-y-1 text-lg">
              Assinar Premium
            </a>
          </div>
          
        </div>
      </div>
    </section>
  `
})
export class PricingComponent {}
