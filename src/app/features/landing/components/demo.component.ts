import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="demo" class="py-32 px-6 bg-slate-50 overflow-hidden border-y border-slate-200/60">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-center gap-20">
          
          <!-- Text Content -->
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0984E3]/10 text-[#0984E3] font-bold text-sm mb-8 tracking-wide">
              <mat-icon class="text-[18px] w-[18px] h-[18px]">visibility</mat-icon> Por dentro do app
            </div>
            <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tighter">
              A experiência que você sempre quis.
            </h2>
            <p class="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              Chega de pastas pesadas e papéis perdidos. O Symphonia Sheet traz uma interface limpa, moderna e focada no que importa: a música.
            </p>
            
            <ul class="space-y-6">
              @for (item of items; track item.title) {
                <li class="flex items-start gap-5 group cursor-default">
                  <div class="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-[#6C5CE7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#6C5CE7] group-hover:text-white group-hover:border-[#6C5CE7] transition-colors duration-300">
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">check</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 text-xl mb-1">{{ item.title }}</h4>
                    <p class="text-slate-600 text-lg">{{ item.desc }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
          
          <!-- Image/UI Mock -->
          <div class="flex-1 relative w-full group">
            <div class="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7] to-[#0984E3] rounded-[3rem] transform rotate-3 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
            <div class="relative bg-white border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-900/10 overflow-hidden transform transition-transform duration-500 group-hover:-translate-y-2">
              <!-- Fake Browser Chrome -->
              <div class="h-12 bg-slate-50 border-b border-slate-200/80 flex items-center px-4 gap-2">
                <div class="w-3 h-3 rounded-full bg-rose-400"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div class="mx-auto bg-white px-24 py-1.5 rounded-md text-xs text-slate-400 font-mono border border-slate-200 shadow-sm flex items-center gap-2">
                  <mat-icon class="text-[14px] w-[14px] h-[14px]">lock</mat-icon> app.symphonia.com
                </div>
              </div>
              <img src="cta.png" alt="App Interface" class="w-full h-auto object-cover opacity-95" referrerpolicy="no-referrer" />
            </div>
            
            <!-- Floating Card -->
            <div class="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300 z-10">
              <div class="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                <mat-icon class="text-3xl w-8 h-8">favorite</mat-icon>
              </div>
              <div>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-0.5">Adicionado aos</p>
                <p class="font-extrabold text-slate-900 text-lg">Favoritos</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  `
})
export class DemoComponent {
  items = [
    { title: 'Partituras e Cifras', desc: 'Visualização otimizada para telas de todos os tamanhos.' },
    { title: 'Player Interativo', desc: 'Acompanhe a partitura com áudio sincronizado.' },
    { title: 'Organização Inteligente', desc: 'Filtre por categoria, artista, dificuldade e instrumento.' },
    { title: 'Comunidade', desc: 'Avalie, comente e compartilhe dicas com outros músicos.' }
  ];
}
