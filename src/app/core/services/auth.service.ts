import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
import { UserRole } from '../models/role.model';
import { MOCK_USER } from '../mocks/mock-data';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Check local storage for fake session
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('symphonia_user');
      if (stored) {
        this.currentUserSignal.set(JSON.parse(stored));
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    // Fake login
    return of(MOCK_USER).pipe(
      delay(800),
      tap(user => {
        this.currentUserSignal.set(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('symphonia_user', JSON.stringify(user));
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    // Fake register
    const newUser: User = {
      ...MOCK_USER,
      id: 'new-user-id',
      name,
      email,
      plan: 'free'
    };
    return of(newUser).pipe(
      delay(800),
      tap(user => {
        this.currentUserSignal.set(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('symphonia_user', JSON.stringify(user));
        }
      })
    );
  }

  recoverPassword(email: string): Observable<boolean> {
    // Fake recover password
    return of(true).pipe(delay(800));
  }

  updatePlan(plan: 'free' | 'premium'): Observable<User> {
    // Fake plan update
    const currentUser = this.currentUserSignal();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    const updatedUser: User = { ...currentUser, plan };
    return of(updatedUser).pipe(
      delay(800),
      tap(user => {
        this.currentUserSignal.set(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('symphonia_user', JSON.stringify(user));
        }
      })
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('symphonia_user');
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserSignal();
    return user ? user.role === role : false;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.currentUserSignal();
    return user ? roles.includes(user.role) : false;
  }

  updateRole(role: UserRole): void {
    const user = this.currentUserSignal();
    if (user) {
      const updatedUser: User = { 
        ...user, 
        role,
        plan: role === UserRole.FREE ? 'free' : 'premium'
      };
      this.currentUserSignal.set(updatedUser);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('symphonia_user', JSON.stringify(updatedUser));
      }
    }
  }
}
