import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <footer class="bg-slate-950 pt-20 pb-10 px-6 border-t border-slate-900">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#0984E3] flex items-center justify-center text-white shadow-lg shadow-[#6C5CE7]/20">
                <mat-icon class="text-[20px] w-[20px] h-[20px]">music_note</mat-icon>
              </div>
              <span class="text-2xl font-extrabold text-white tracking-tighter">Symphonia</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              A plataforma moderna para músicos, corais e líderes de louvor organizarem e acessarem seus materiais.
            </p>
            <div class="flex gap-5">
              <a href="#" class="text-slate-500 hover:text-white transition-colors duration-300"><mat-icon>facebook</mat-icon></a>
              <a href="#" class="text-slate-500 hover:text-white transition-colors duration-300"><mat-icon>camera_alt</mat-icon></a>
              <a href="#" class="text-slate-500 hover:text-white transition-colors duration-300"><mat-icon>play_arrow</mat-icon></a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Produto</h4>
            <ul class="space-y-4">
              <li><a href="#features" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Funcionalidades</a></li>
              <li><a href="#pricing" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Planos e Preços</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Catálogo</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Novidades</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Suporte</h4>
            <ul class="space-y-4">
              <li><a href="#faq" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">FAQ</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Central de Ajuda</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Termos de Uso</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium">Política de Privacidade</a></li>
            </ul>
          </div>
          
        </div>
        
        <div class="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-slate-500 text-sm font-medium">
            &copy; 2026 Symphonia Sheet. Todos os direitos reservados.
          </p>
          <div class="flex items-center gap-2 text-slate-500 text-sm font-medium">
            Feito com <mat-icon class="text-rose-500 text-[16px] w-[16px] h-[16px] animate-pulse">favorite</mat-icon> para a música
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
