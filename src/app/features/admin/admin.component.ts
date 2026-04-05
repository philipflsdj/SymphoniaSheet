import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  trend: string;
  trendUp: boolean;
  color: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Premium';
  status: 'Ativo' | 'Inativo';
  avatar: string;
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  time: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="p-6 md:p-10 max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Painel Administrativo</h1>
          <p class="text-slate-500 font-medium text-lg">Visão geral e gestão da plataforma Symphonia Sheet.</p>
        </div>
        <button class="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2">
          <mat-icon>download</mat-icon> Gerar Relatório
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        @for (stat of stats(); track stat.title) {
          <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-110" [ngClass]="stat.color"></div>
            
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center" [ngClass]="stat.color + '/10 text-' + stat.color.split('-')[1] + '-600'">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <span class="flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg" [ngClass]="stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'">
                <mat-icon class="text-[16px] w-[16px] h-[16px]">{{ stat.trendUp ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stat.trend }}
              </span>
            </div>
            
            <div class="relative z-10">
              <h3 class="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{{ stat.value }}</h3>
              <p class="text-slate-500 font-medium">{{ stat.title }}</p>
            </div>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Users Table -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div class="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">Gestão de Usuários</h2>
            <button class="text-[#6C5CE7] hover:bg-[#6C5CE7]/10 p-2 rounded-lg transition-colors" title="Ver todos">
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th class="p-4 pl-6 font-bold">Usuário</th>
                  <th class="p-4 font-bold">Plano</th>
                  <th class="p-4 font-bold">Status</th>
                  <th class="p-4 pr-6 text-right font-bold">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (user of users(); track user.id) {
                  <tr class="hover:bg-slate-50/50 transition-colors group">
                    <td class="p-4 pl-6">
                      <div class="flex items-center gap-3">
                        <img [src]="user.avatar" alt="Avatar" class="w-10 h-10 rounded-full border border-slate-200 object-cover">
                        <div>
                          <p class="text-sm font-bold text-slate-900">{{ user.name }}</p>
                          <p class="text-xs text-slate-500 font-medium">{{ user.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="p-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border" [ngClass]="user.plan === 'Premium' ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] border-[#6C5CE7]/20' : 'bg-slate-100 text-slate-600 border-slate-200'">
                        {{ user.plan }}
                      </span>
                    </td>
                    <td class="p-4">
                      <span class="flex items-center gap-1.5 text-sm font-bold" [ngClass]="user.status === 'Ativo' ? 'text-emerald-600' : 'text-slate-400'">
                        <span class="w-2 h-2 rounded-full" [ngClass]="user.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="p-4 pr-6 text-right">
                      <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="w-8 h-8 rounded-lg text-slate-400 hover:text-[#0984E3] hover:bg-[#0984E3]/10 flex items-center justify-center transition-colors" title="Editar">
                          <mat-icon class="text-[18px] w-[18px] h-[18px]">edit</mat-icon>
                        </button>
                        <button class="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors" title="Bloquear">
                          <mat-icon class="text-[18px] w-[18px] h-[18px]">block</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div class="p-6 border-b border-slate-100">
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">Atividade Recente</h2>
          </div>
          
          <div class="p-6 flex-1 overflow-y-auto">
            <div class="relative border-l-2 border-slate-100 ml-4 space-y-8">
              @for (activity of activities(); track activity.id) {
                <div class="relative pl-6">
                  <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center" [ngClass]="activity.color"></div>
                  <p class="text-sm font-bold text-slate-900 mb-0.5">{{ activity.action }}</p>
                  <p class="text-xs text-slate-500 font-medium mb-1">por <span class="font-bold text-slate-700">{{ activity.user }}</span></p>
                  <p class="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <mat-icon class="text-[14px] w-[14px] h-[14px]">schedule</mat-icon> {{ activity.time }}
                  </p>
                </div>
              }
            </div>
          </div>
          
          <div class="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <button class="text-sm font-bold text-[#6C5CE7] hover:underline">Ver todo o histórico</button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AdminComponent {
  
  // Mock Data
  stats = signal<StatCard[]>([
    { title: 'Total de Usuários', value: '12.450', icon: 'people', trend: '+12%', trendUp: true, color: 'bg-[#6C5CE7]' },
    { title: 'Assinantes Premium', value: '3.120', icon: 'workspace_premium', trend: '+5%', trendUp: true, color: 'bg-amber-500' },
    { title: 'Partituras no Acervo', value: '845', icon: 'library_music', trend: '+24', trendUp: true, color: 'bg-[#0984E3]' },
    { title: 'Artistas Cadastrados', value: '112', icon: 'mic', trend: '-2%', trendUp: false, color: 'bg-emerald-500' }
  ]);

  users = signal<AdminUser[]>([
    { id: '1', name: 'Lucas Silva', email: 'lucas.silva@email.com', plan: 'Premium', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Mariana Costa', email: 'mariana.c@email.com', plan: 'Free', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'João Pedro', email: 'jp.music@email.com', plan: 'Premium', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Ana Souza', email: 'ana.souza@email.com', plan: 'Free', status: 'Inativo', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Carlos Mendes', email: 'carlos.m@email.com', plan: 'Premium', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=5' }
  ]);

  activities = signal<RecentActivity[]>([
    { id: '1', action: 'Nova partitura adicionada: "Castelo Forte"', user: 'Admin Principal', time: 'Há 10 minutos', icon: 'add_circle', color: 'bg-[#0984E3]' },
    { id: '2', action: 'Novo assinante Premium', user: 'Lucas Silva', time: 'Há 45 minutos', icon: 'star', color: 'bg-amber-500' },
    { id: '3', action: 'Categoria "Louvor Jovem" atualizada', user: 'Moderador', time: 'Há 2 horas', icon: 'edit', color: 'bg-emerald-500' },
    { id: '4', action: 'Usuário reportou erro em cifra', user: 'Mariana Costa', time: 'Há 5 horas', icon: 'report_problem', color: 'bg-rose-500' },
    { id: '5', action: 'Backup do sistema concluído', user: 'Sistema', time: 'Ontem às 23:00', icon: 'backup', color: 'bg-[#6C5CE7]' }
  ]);
}
