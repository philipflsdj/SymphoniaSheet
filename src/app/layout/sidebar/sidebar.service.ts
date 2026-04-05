import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly STORAGE_KEY = 'symphonia_sidebar_collapsed';
  
  private isCollapsedSignal = signal<boolean>(
    localStorage.getItem(this.STORAGE_KEY) === 'true'
  );

  private isMobileOpenSignal = signal<boolean>(false);

  readonly isCollapsed = this.isCollapsedSignal.asReadonly();
  readonly isMobileOpen = this.isMobileOpenSignal.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, String(this.isCollapsedSignal()));
    });
  }

  toggleCollapse() {
    this.isCollapsedSignal.update(v => !v);
  }

  setCollapsed(value: boolean) {
    this.isCollapsedSignal.set(value);
  }

  toggleMobile() {
    this.isMobileOpenSignal.update(v => !v);
  }

  setMobileOpen(value: boolean) {
    this.isMobileOpenSignal.set(value);
  }

  closeMobile() {
    this.isMobileOpenSignal.set(false);
  }
}
