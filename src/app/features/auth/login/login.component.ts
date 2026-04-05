import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, ButtonComponent, InputComponent, CardComponent, RouterLink],
  template: `
    <div class="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          
          <div class="inline-flex items-center justify-center w-64 h-64 rounded-[2.5rem] bg-primary-100 mb-4 overflow-hidden shadow-sm">
            <img
              src="mascot.png"
              alt="Passarinho da Música"
              class="w-full h-full object-cover"
            />
          </div>
          
          <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Symphonia</h1>
          <p class="text-surface-500 mt-2">Acesse sua biblioteca musical adventista</p>
          
        </div>

        <app-card padding="lg">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
            <app-input
              id="email"
              label="E-mail"
              type="email"
              icon="mail"
              placeholder="seu@email.com"
              formControlName="email"
              [error]="(loginForm.get('email')?.touched && loginForm.get('email')?.invalid) ? 'E-mail inválido' : ''"
            ></app-input>

            <app-input
              id="password"
              label="Senha"
              type="password"
              icon="lock"
              placeholder="••••••••"
              formControlName="password"
              [error]="(loginForm.get('password')?.touched && loginForm.get('password')?.invalid) ? 'Senha obrigatória' : ''"
            ></app-input>

            <div class="flex items-center justify-between mt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded border-surface-300 text-primary-600 focus:ring-primary-500 w-4 h-4" />
                <span class="text-sm text-surface-600 font-medium">Lembrar-me</span>
              </label>
              <a routerLink="/recover-password" class="text-sm font-bold text-primary-600 hover:text-primary-700">Esqueceu a senha?</a>
            </div>

            <app-button 
              type="submit" 
              [fullWidth]="true" 
              size="lg"
              [disabled]="loginForm.invalid || isLoading()"
            >
              @if (isLoading()) {
                <mat-icon class="animate-spin mr-2">refresh</mat-icon> Entrando...
              } @else {
                Entrar
              }
            </app-button>
          </form>
        </app-card>
        
        <p class="text-center text-sm text-surface-500 mt-8 font-medium">
          Não tem uma conta? <a routerLink="/register" class="text-primary-600 font-bold hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['joao@symphonia.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading.set(false);
          // Handle error
        }
      });
    }
  }
}
