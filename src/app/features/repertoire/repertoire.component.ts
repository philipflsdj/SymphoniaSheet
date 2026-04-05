import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface RepertoireItem {
  id: string;
  title: string;
  artist: string;
  category: string;
  key: string;
  tempo: string;
  instruments: string[];
  status: 'Em estudo' | 'Pronto para ensaio' | 'Apresentado' | 'Favorito';
  isFavorite: boolean;
}

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="p-6 md:p-10 max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Meu Repertório</h1>
          <p class="text-slate-500 font-medium text-lg">Organize suas músicas, ensaios e apresentações.</p>
        </div>
        <button class="bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#6C5CE7]/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <mat-icon>add</mat-icon> Adicionar música
        </button>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</mat-icon>
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            placeholder="Buscar por música ou artista..." 
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] transition-all font-medium text-slate-700"
          >
        </div>
        <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <select [(ngModel)]="statusFilter" class="bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 min-w-[160px] cursor-pointer">
            <option value="Todos">Todos os status</option>
            <option value="Em estudo">Em estudo</option>
            <option value="Pronto para ensaio">Pronto para ensaio</option>
            <option value="Apresentado">Apresentado</option>
            <option value="Favorito">Favoritos</option>
          </select>
          <button class="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
            <mat-icon class="text-[20px] w-[20px] h-[20px]">tune</mat-icon> Mais filtros
          </button>
        </div>
      </div>

      <!-- Repertoire Grid -->
      @if (filteredItems().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          @for (item of filteredItems(); track item.id) {
            <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-[#6C5CE7]/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              
              <div class="flex justify-between items-start mb-4">
                <div class="flex flex-wrap gap-2">
                  <span [ngClass]="getStatusColor(item.status)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border">
                    {{ item.status }}
                  </span>
                  <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                    {{ item.category }}
                  </span>
                </div>
                <button (click)="toggleFavorite(item)" class="text-slate-300 hover:text-rose-500 transition-colors" [class.text-rose-500]="item.isFavorite">
                  <mat-icon>{{ item.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
                </button>
              </div>

              <div class="mb-6 flex-1">
                <h3 class="text-xl font-extrabold text-slate-900 mb-1 tracking-tight line-clamp-1" [title]="item.title">{{ item.title }}</h3>
                <p class="text-slate-500 font-medium line-clamp-1">{{ item.artist }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Tonalidade</p>
                  <p class="text-slate-700 font-bold flex items-center gap-1">
                    <mat-icon class="text-[16px] w-[16px] h-[16px] text-[#0984E3]">music_note</mat-icon> {{ item.key }}
                  </p>
                </div>
                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Andamento</p>
                  <p class="text-slate-700 font-bold flex items-center gap-1">
                    <mat-icon class="text-[16px] w-[16px] h-[16px] text-amber-500">speed</mat-icon> {{ item.tempo }}
                  </p>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <div class="flex -space-x-2">
                  @for (inst of item.instruments.slice(0, 3); track inst) {
                    <div class="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600" [title]="inst">
                      {{ inst.charAt(0) }}
                    </div>
                  }
                  @if (item.instruments.length > 3) {
                    <div class="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                      +{{ item.instruments.length - 3 }}
                    </div>
                  }
                </div>
                
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button class="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors border border-slate-200" title="Editar">
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">edit</mat-icon>
                  </button>
                  <button class="w-10 h-10 rounded-full bg-[#6C5CE7]/10 hover:bg-[#6C5CE7]/20 text-[#6C5CE7] flex items-center justify-center transition-colors" title="Visualizar">
                    <mat-icon class="text-[20px] w-[20px] h-[20px]">visibility</mat-icon>
                  </button>
                </div>
              </div>

            </div>
          }
        </div>
      } @else {
        <!-- Empty State -->
        <div class="bg-white rounded-3xl border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <mat-icon class="text-slate-300 text-5xl w-12 h-12">queue_music</mat-icon>
          </div>
          <h3 class="text-2xl font-extrabold text-slate-900 mb-2">Nenhuma música encontrada</h3>
          <p class="text-slate-500 font-medium max-w-md mb-8">
            Você ainda não adicionou músicas com esses filtros ou seu repertório está vazio.
          </p>
          <button (click)="searchQuery.set(''); statusFilter.set('Todos')" class="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
            Limpar filtros
          </button>
        </div>
      }
    </div>
  `
})
export class RepertoireComponent {
  searchQuery = signal('');
  statusFilter = signal('Todos');

  // Mock Data
  items = signal<RepertoireItem[]>([
    {
      id: '1',
      title: 'Castelo Forte',
      artist: 'Hinário Adventista',
      category: 'Hinos',
      key: 'C',
      tempo: '110 BPM',
      instruments: ['Piano', 'Voz', 'Violino'],
      status: 'Pronto para ensaio',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Além do Rio',
      artist: 'Arautos do Rei',
      category: 'Quartetos',
      key: 'G',
      tempo: '85 BPM',
      instruments: ['Tenor 1', 'Tenor 2', 'Barítono', 'Baixo', 'Piano'],
      status: 'Em estudo',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Brilhar por Ti',
      artist: 'Ministério Jovem',
      category: 'Louvor Jovem',
      key: 'D',
      tempo: '120 BPM',
      instruments: ['Violão', 'Bateria', 'Baixo', 'Voz'],
      status: 'Apresentado',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Vaso de Alabastro',
      artist: 'Prisma Brasil',
      category: 'Coral',
      key: 'F',
      tempo: '75 BPM',
      instruments: ['Soprano', 'Contralto', 'Tenor', 'Baixo', 'Orquestra'],
      status: 'Em estudo',
      isFavorite: false
    }
  ]);

  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const status = this.statusFilter();
    
    return this.items().filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query);
      const matchesStatus = status === 'Todos' || 
                            (status === 'Favorito' ? item.isFavorite : item.status === status);
      return matchesSearch && matchesStatus;
    });
  });

  getStatusColor(status: string): string {
    switch (status) {
      case 'Em estudo': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Pronto para ensaio': return 'bg-[#6C5CE7]/10 text-[#6C5CE7] border-[#6C5CE7]/20';
      case 'Apresentado': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }

  toggleFavorite(item: RepertoireItem) {
    this.items.update(items => 
      items.map(i => i.id === item.id ? { ...i, isFavorite: !i.isFavorite } : i)
    );
  }
}
