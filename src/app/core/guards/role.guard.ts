import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/role.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const requiredRoles = route.data['roles'] as UserRole[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (authService.hasAnyRole(requiredRoles)) {
    return true;
  }

  // Se não tem acesso, redireciona para a tela de upgrade (ou dashboard se já for premium mas não admin)
  const isFree = authService.hasRole(UserRole.FREE);
  if (isFree) {
    return router.createUrlTree(['/premium-required']);
  }
  
  return router.createUrlTree(['/dashboard']);
};
