import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/role.model';
import { SearchBarComponent } from './search-bar.component';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, SearchBarComponent, FormsModule],
  template: `
    <header class="h-16 bg-white/80 backdrop-blur-md border-b border-surface-200/80 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div class="flex items-center flex-1 gap-3 sm:gap-4">
        <!-- Mobile Menu Toggle -->
        <button 
          class="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-surface-500 hover:bg-surface-100 hover:text-surface-900 transition-colors"
          (click)="sidebarService.toggleMobile()"
        >
          <mat-icon class="text-[20px] w-[20px] h-[20px]">menu</mat-icon>
        </button>
        
        <app-search-bar class="w-full max-w-md"></app-search-bar>
      </div>
      
      <div class="flex items-center gap-2 sm:gap-4 ml-4">
        <!-- Role Switcher for Mocking -->
        <div class="hidden lg:flex items-center gap-2 bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-200/60 shadow-sm">
          <mat-icon class="text-surface-400 text-[18px] w-[18px] h-[18px]">admin_panel_settings</mat-icon>
          <select 
            [ngModel]="user()?.role" 
            (ngModelChange)="changeRole($event)"
            class="bg-transparent text-xs font-semibold text-surface-700 focus:outline-none cursor-pointer"
          >
            <option [value]="UserRole.OWNER">Owner</option>
            <option [value]="UserRole.ADMIN">Admin</option>
            <option [value]="UserRole.SUBSCRIBER">Assinante</option>
            <option [value]="UserRole.FREE">Free</option>
          </select>
        </div>

        <button class="w-9 h-9 rounded-full flex items-center justify-center text-surface-500 hover:bg-surface-100 hover:text-surface-900 transition-colors relative">
          <mat-icon class="text-[20px] w-[20px] h-[20px]">notifications</mat-icon>
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div class="flex items-center gap-3 pl-3 sm:pl-4 border-l border-surface-200/80">
          <div class="flex flex-col items-end hidden sm:flex">
            <span class="text-sm font-semibold text-surface-900 leading-tight">{{ user()?.name }}</span>
            <span class="text-[11px] font-medium text-surface-500 capitalize">{{ user()?.role }}</span>
          </div>
          <img 
            [src]="user()?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'" 
            alt="Avatar" 
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-100 border border-surface-200 shadow-sm object-cover"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  private authService = inject(AuthService);
  sidebarService = inject(SidebarService);
  user = this.authService.currentUser;
  UserRole = UserRole;

  changeRole(role: UserRole) {
    this.authService.updateRole(role);
  }
}
