import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, NgClass],
  template: `
    <div class="min-h-screen bg-[#f8fafc] flex">
      <!-- Mobile Overlay -->
      @if (sidebarService.isMobileOpen()) {
        <div 
          class="fixed inset-0 bg-surface-900/40 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          (click)="sidebarService.closeMobile()"
        ></div>
      }

      <app-sidebar></app-sidebar>
      
      <div 
        class="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        [ngClass]="{
          'md:ml-64': !sidebarService.isCollapsed(),
          'md:ml-20': sidebarService.isCollapsed()
        }"
      >
        <app-navbar></app-navbar>
        
        <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div class="max-w-7xl mx-auto">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {
  sidebarService = inject(SidebarService);
}


