import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <header class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200/60 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3 group cursor-pointer">
        <img 
          src="logo.png" 
          alt="Symphonía Sheet Logo" 
          class="h-10 w-auto rounded-xl object-contain shadow-lg shadow-[#6C5CE7]/20 group-hover:shadow-[#6C5CE7]/40 group-hover:scale-105 transition-all duration-300"
        >
          <span class="text-2xl font-extrabold tracking-tighter text-slate-900">Symphonia</span>
        </div>
        
        <nav class="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#features" class="hover:text-[#6C5CE7] transition-colors duration-200">Funcionalidades</a>
          <a href="#demo" class="hover:text-[#6C5CE7] transition-colors duration-200">Como funciona</a>
          <a href="#pricing" class="hover:text-[#6C5CE7] transition-colors duration-200">Planos</a>
          <a href="#faq" class="hover:text-[#6C5CE7] transition-colors duration-200">FAQ</a>
        </nav>

        <div class="flex items-center gap-5">
          <a routerLink="/login" class="hidden sm:block font-bold text-slate-600 hover:text-slate-900 transition-colors duration-200">Entrar</a>
          <a routerLink="/register" class="bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg shadow-[#6C5CE7]/25 hover:shadow-xl hover:shadow-[#6C5CE7]/40 hover:-translate-y-0.5 active:translate-y-0">
            Começar grátis
          </a>
        </div>
      </div>
    </header>
  `
})
export class NavbarPublicComponent {}
