import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/role.model';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./features/auth/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'plans',
    loadComponent: () => import('./features/auth/plan-selection/plan-selection.component').then(m => m.PlanSelectionComponent),
    canActivate: [authGuard]
  },
  {
    path: 'premium-required',
    loadComponent: () => import('./features/premium-required/premium-required.component').then(m => m.PremiumRequiredComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'sheets',
        loadComponent: () => import('./features/sheets/sheets.component').then(m => m.SheetsComponent)
      },
      {
        path: 'sheets/:id',
        loadComponent: () => import('./features/sheet-details/sheet-details.component').then(m => m.SheetDetailsComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'repertoire',
        loadComponent: () => import('./features/repertoire/repertoire.component').then(m => m.RepertoireComponent),
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.SUBSCRIBER] }
      },
      {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.OWNER] }
      },
      {
        path: 'admin/sheets/create',
        loadComponent: () => import('./features/admin/create-sheet/create-sheet.component').then(m => m.CreateSheetComponent),
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.OWNER] }
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
