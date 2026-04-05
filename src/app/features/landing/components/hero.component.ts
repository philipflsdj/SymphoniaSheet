import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <section class="pt-40 pb-32 px-6 overflow-hidden relative">
      <!-- Background decorations -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#6C5CE7]/10 via-[#0984E3]/5 to-transparent rounded-full blur-3xl -z-10 opacity-70"></div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200/60 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300 cursor-default">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-sm font-bold text-slate-700 tracking-wide">Freemium • Sem cartão de crédito</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-[1.1] max-w-5xl mx-auto">
          Sua música, organizada e <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#0984E3]">sempre à mão.</span>
        </h1>

        <!-- Mascot Container -->
        <div class="mt-16 relative mx-auto max-w-lg group perspective-1000">
          <!-- Decorative background glow -->
          <div class="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7]/30 to-[#0984E3]/30 rounded-[3rem] blur-2xl transform group-hover:scale-105 transition-transform duration-700 -z-10"></div>
          
          <div class="rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-900/10 bg-white transform transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2">
            <div class="aspect-square relative flex items-center justify-center bg-slate-50">
              <img src="mascot.png" alt="Symphonia Mascot" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
              
              <!-- Floating UI element -->
              <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/50 flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <mat-icon class="text-sm w-4 h-4 flex items-center justify-center">check</mat-icon>
                </div>
                <span class="text-sm font-bold text-slate-700 whitespace-nowrap">Pronto para reger!</span>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          A plataforma definitiva para músicos adventistas, corais e líderes de louvor. Partituras, cifras e kits de ensaio em um só lugar.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a routerLink="/register" class="w-full sm:w-auto bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-[#6C5CE7]/30 hover:shadow-2xl hover:shadow-[#6C5CE7]/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group">
            Começar grátis <mat-icon class="group-hover:translate-x-1 transition-transform duration-300">arrow_forward</mat-icon>
          </a>
          <a href="#demo" class="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
            <mat-icon class="text-[#0984E3] group-hover:scale-110 transition-transform duration-300">play_circle</mat-icon> Ver como funciona
          </a>
        </div>
        
       
      </div>
    </section>
  `
})
export class HeroComponent {}
