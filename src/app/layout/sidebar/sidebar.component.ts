import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HasRoleDirective } from '../../shared/directives/has-role.directive';
import { UserRole } from '../../core/models/role.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, HasRoleDirective, NgClass, NgTemplateOutlet],
  template: `
    <aside 
      class="h-screen bg-white border-r border-surface-200/80 flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      [ngClass]="{
        'w-64': !sidebarService.isCollapsed(),
        'w-20': sidebarService.isCollapsed(),
        'translate-x-0': sidebarService.isMobileOpen(),
        '-translate-x-full md:translate-x-0': !sidebarService.isMobileOpen()
      }"
    >
      <!-- Header / Logo -->
      <div class="h-16 flex items-center justify-between px-5 border-b border-surface-100">
        <div class="flex items-center overflow-hidden whitespace-nowrap">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 text-primary-600 flex items-center justify-center shrink-0 shadow-sm ring-1 ring-primary-500/10">
            <mat-icon class="text-[20px] w-[20px] h-[20px]">music_note</mat-icon>
          </div>
          <span 
            class="text-lg font-bold text-surface-900 tracking-tight ml-3 transition-all duration-300"
            [ngClass]="{'opacity-0 w-0 translate-x-[-10px]': sidebarService.isCollapsed(), 'opacity-100 translate-x-0': !sidebarService.isCollapsed()}"
          >
            Symphonia
          </span>
        </div>
        
        <!-- Mobile Close Button -->
        <button 
          class="md:hidden w-8 h-8 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-100/80 rounded-lg transition-colors"
          (click)="sidebarService.closeMobile()"
        >
          <mat-icon class="text-[20px] w-[20px] h-[20px]">close</mat-icon>
        </button>
      </div>
      
      <!-- Menu Items -->
      <div class="flex-1 overflow-y-auto py-5 flex flex-col gap-1.5 custom-scrollbar">
        @for (item of menuItems; track item.path) {
          @if (!item.roles || item.roles.length === 0) {
            <ng-container *ngTemplateOutlet="menuItemTemplate; context: { $implicit: item }"></ng-container>
          } @else {
            <ng-container *appHasRole="item.roles">
              <ng-container *ngTemplateOutlet="menuItemTemplate; context: { $implicit: item }"></ng-container>
            </ng-container>
          }
        }
      </div>

      <!-- Footer Actions -->
      <div class="p-3 border-t border-surface-100 flex flex-col gap-1.5">
        <!-- Collapse Toggle (Desktop Only) -->
        <button 
          (click)="sidebarService.toggleCollapse()"
          class="hidden md:flex items-center px-3 py-2.5 mx-2 rounded-lg text-surface-500 hover:bg-surface-100/80 hover:text-surface-900 transition-all duration-200 group relative"
          [ngClass]="{'justify-center mx-auto w-12': sidebarService.isCollapsed()}"
        >
          <mat-icon class="text-[20px] w-[20px] h-[20px] transition-transform duration-300 shrink-0" [ngClass]="{'rotate-180': sidebarService.isCollapsed()}">
            keyboard_double_arrow_left
          </mat-icon>
          <span 
            class="ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300"
            [ngClass]="{'opacity-0 w-0 hidden': sidebarService.isCollapsed(), 'opacity-100': !sidebarService.isCollapsed()}"
          >
            Recolher
          </span>
          
          <!-- Tooltip -->
          @if (sidebarService.isCollapsed()) {
            <div class="absolute left-full ml-4 px-2.5 py-1.5 bg-surface-800 text-white text-xs font-medium rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 flex items-center border border-surface-700">
              <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-surface-800 border-l border-b border-surface-700 rotate-45 rounded-sm"></div>
              Expandir
            </div>
          }
        </button>

        <!-- Logout -->
        <button 
          (click)="logout()"
          class="flex items-center px-3 py-2.5 mx-2 rounded-lg text-surface-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group relative"
          [ngClass]="{'justify-center mx-auto w-12': sidebarService.isCollapsed()}"
        >
          <mat-icon class="text-[20px] w-[20px] h-[20px] shrink-0">logout</mat-icon>
          <span 
            class="ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300"
            [ngClass]="{'opacity-0 w-0 hidden': sidebarService.isCollapsed(), 'opacity-100': !sidebarService.isCollapsed()}"
          >
            Sair
          </span>
          
          <!-- Tooltip -->
          @if (sidebarService.isCollapsed()) {
            <div class="absolute left-full ml-4 px-2.5 py-1.5 bg-surface-800 text-white text-xs font-medium rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 flex items-center border border-surface-700">
              <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-surface-800 border-l border-b border-surface-700 rotate-45 rounded-sm"></div>
              Sair
            </div>
          }
        </button>
      </div>
    </aside>

    <!-- Menu Item Template -->
    <ng-template #menuItemTemplate let-item>
      <a
        [routerLink]="item.path"
        routerLinkActive="bg-primary-50/80 text-primary-700 font-semibold shadow-sm ring-1 ring-primary-500/10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary-600 before:rounded-r-full"
        [routerLinkActiveOptions]="{exact: item.exact}"
        (click)="sidebarService.closeMobile()"
        class="flex items-center px-3 py-2.5 mx-3 rounded-lg text-surface-500 hover:bg-surface-100/80 hover:text-surface-900 transition-all duration-200 group relative"
        [ngClass]="{'justify-center mx-auto w-12': sidebarService.isCollapsed()}"
      >
        <mat-icon class="text-[20px] w-[20px] h-[20px] shrink-0 transition-colors duration-200">{{ item.icon }}</mat-icon>
        <span 
          class="ml-3 text-sm whitespace-nowrap transition-all duration-300"
          [ngClass]="{'opacity-0 w-0 hidden': sidebarService.isCollapsed(), 'opacity-100': !sidebarService.isCollapsed()}"
        >
          {{ item.label }}
        </span>
        
        <!-- Tooltip for collapsed state -->
        @if (sidebarService.isCollapsed()) {
          <div class="absolute left-full ml-4 px-2.5 py-1.5 bg-surface-800 text-white text-xs font-medium rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 flex items-center border border-surface-700">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-surface-800 border-l border-b border-surface-700 rotate-45 rounded-sm"></div>
            {{ item.label }}
          </div>
        }
      </a>
    </ng-template>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 20px;
    }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
      background-color: #94a3b8;
    }
  `]
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  UserRole = UserRole;

  menuItems = [
    { path: '/dashboard', label: 'Início', icon: 'home', exact: true },
    { path: '/sheets', label: 'Partituras', icon: 'library_music', exact: false },
    { path: '/favorites', label: 'Favoritos', icon: 'favorite', exact: false },
    { path: '/repertoire', label: 'Repertórios', icon: 'queue_music', exact: false, roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.SUBSCRIBER] },
    { path: '/categories', label: 'Categorias', icon: 'category', exact: false },
    { path: '/admin', label: 'Painel Admin', icon: 'admin_panel_settings', exact: false, roles: [UserRole.ADMIN, UserRole.OWNER] },
    { path: '/profile', label: 'Perfil', icon: 'person', exact: false },
  ];

  logout() {
    this.authService.logout();
  }
}
