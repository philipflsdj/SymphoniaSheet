import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="features" class="py-32 px-6 bg-white relative">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter">Tudo para o seu ministério</h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto font-medium">Desenvolvido pensando nas necessidades reais de quem faz a música acontecer na igreja.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (feature of features; track feature.title) {
            <div class="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-[#6C5CE7]/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
              <div class="w-14 h-14 rounded-2xl bg-slate-50 shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300" [class]="feature.colorClass">
                <mat-icon>{{ feature.icon }}</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{{ feature.title }}</h3>
              <p class="text-slate-600 leading-relaxed text-lg">{{ feature.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {
  features = [
    {
      icon: 'bolt',
      title: 'Estude mais rápido',
      description: 'Ferramentas integradas como player, metrônomo e transposição para acelerar seu aprendizado.',
      colorClass: 'text-amber-500'
    },
    {
      icon: 'folder_special',
      title: 'Tenha tudo organizado',
      description: 'Crie repertórios, salve favoritos e encontre rapidamente o que precisa com nossa busca inteligente.',
      colorClass: 'text-[#0984E3]'
    },
    {
      icon: 'devices',
      title: 'Acesse em qualquer lugar',
      description: 'Suas partituras sincronizadas no celular, tablet ou computador. Leve seu acervo para onde for.',
      colorClass: 'text-[#6C5CE7]'
    },
    {
      icon: 'groups',
      title: 'Material pronto para ensaio',
      description: 'Kits de vozes separados, cifras revisadas e partituras em PDF prontas para impressão.',
      colorClass: 'text-emerald-500'
    },
    {
      icon: 'library_music',
      title: 'Biblioteca crescente',
      description: 'Novos arranjos, hinos e músicas adicionados constantemente pela nossa comunidade.',
      colorClass: 'text-rose-500'
    }
  ];
}
