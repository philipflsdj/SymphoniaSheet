import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-32 px-6 relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/80 to-[#0984E3]/80 z-0 mix-blend-multiply"></div>
      
      <!-- Decorative circles -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/40 rounded-full blur-[100px]"></div>
        <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#0984E3]/40 rounded-full blur-[100px]"></div>
      </div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tighter">
          Pronto para elevar o nível do seu ministério?
        </h2>
        <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
          Junte-se a nós hoje mesmo. Crie sua conta gratuita em menos de 1 minuto e comece a explorar.
        </p>
        <a routerLink="/register" class="inline-block bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-lg py-5 px-12 rounded-full transition-all duration-300 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:-translate-y-1 active:translate-y-0">
          Criar conta gratuita
        </a>
        <p class="mt-8 text-white/70 text-sm font-medium tracking-wide uppercase">Sem necessidade de cartão de crédito</p>
      </div>
    </section>
  `
})
export class CtaComponent {}
