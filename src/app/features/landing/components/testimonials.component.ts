import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section class="py-32 px-6 bg-slate-50 border-y border-slate-200/60">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter">O que dizem nossos usuários</h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto font-medium">Junte-se a centenas de músicos que já transformaram seus ensaios.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          @for (testimonial of testimonials; track testimonial.name) {
            <div class="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
              <mat-icon class="absolute top-8 right-8 text-slate-100 text-6xl w-16 h-16 group-hover:text-[#6C5CE7]/5 transition-colors duration-300 -z-0">format_quote</mat-icon>
              <div class="flex gap-1 mb-6 text-amber-400 relative z-10">
                <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
                <mat-icon class="text-[20px] w-[20px] h-[20px]">star</mat-icon>
              </div>
              <p class="text-slate-700 mb-10 relative z-10 text-lg font-medium leading-relaxed">"{{ testimonial.text }}"</p>
              <div class="flex items-center gap-4 mt-auto relative z-10">
                <img [src]="testimonial.avatar" [alt]="testimonial.name" class="w-14 h-14 rounded-full bg-slate-100 ring-2 ring-white shadow-sm" referrerpolicy="no-referrer" />
                <div>
                  <h4 class="font-bold text-slate-900 text-lg">{{ testimonial.name }}</h4>
                  <p class="text-sm text-slate-500 font-medium">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  testimonials = [
    {
      text: 'O Symphonia mudou a forma como nosso quarteto ensaia. Ter os kits de vozes e as partituras no mesmo lugar economiza muito tempo.',
      name: 'Marcos Silva',
      role: 'Diretor de Quarteto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos'
    },
    {
      text: 'Como pianista da igreja, eu sempre sofria com pastas pesadas. Agora levo meu tablet com o Symphonia e tenho tudo na ponta dos dedos.',
      name: 'Ana Beatriz',
      role: 'Pianista',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
    },
    {
      text: 'A facilidade de encontrar cifras revisadas e poder transpor os tons rapidamente me ajuda muito na liderança do louvor jovem.',
      name: 'Lucas Oliveira',
      role: 'Líder de Louvor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas'
    }
  ];
}
