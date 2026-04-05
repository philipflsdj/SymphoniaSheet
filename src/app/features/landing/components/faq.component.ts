import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="faq" class="py-32 px-6 bg-white">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter">Perguntas Frequentes</h2>
          <p class="text-xl text-slate-600 font-medium">Tudo o que você precisa saber sobre o Symphonia Sheet.</p>
        </div>
        
        <div class="space-y-4">
          @for (faq of faqs; track faq.q; let i = $index) {
            <div class="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#6C5CE7]/30" [class.bg-slate-50]="openIndex === i" [class.shadow-sm]="openIndex === i">
              <button 
                class="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
                (click)="toggle(i)"
              >
                <span class="font-bold text-slate-900 text-lg group-hover:text-[#6C5CE7] transition-colors duration-300">{{ faq.q }}</span>
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#6C5CE7]/10 transition-colors duration-300">
                  <mat-icon class="text-slate-500 group-hover:text-[#6C5CE7] transition-transform duration-300" [class.rotate-180]="openIndex === i">
                    expand_more
                  </mat-icon>
                </div>
              </button>
              <div 
                class="px-8 overflow-hidden transition-all duration-300 ease-in-out"
                [style.maxHeight]="openIndex === i ? '200px' : '0'"
                [style.paddingBottom]="openIndex === i ? '1.5rem' : '0'"
              >
                <p class="text-slate-600 text-lg leading-relaxed">{{ faq.a }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class FaqComponent {
  openIndex: number | null = 0;

  faqs = [
    {
      q: 'Precisa pagar para usar?',
      a: 'Não! Você pode criar uma conta gratuita e acessar diversas partituras livres no nosso catálogo. O plano Premium é opcional para quem deseja downloads e recursos avançados.'
    },
    {
      q: 'Funciona no celular?',
      a: 'Sim. O Symphonia Sheet é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores diretamente pelo navegador.'
    },
    {
      q: 'Posso cancelar o Premium a qualquer momento?',
      a: 'Com certeza. Não há fidelidade. Você pode cancelar sua assinatura Premium quando quiser, diretamente pelo painel da sua conta.'
    },
    {
      q: 'Com que frequência novos conteúdos são adicionados?',
      a: 'Nossa equipe e comunidade adicionam novas partituras, cifras e kits de ensaio semanalmente, garantindo que você sempre tenha novidades.'
    }
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
