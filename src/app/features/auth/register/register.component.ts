import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-register',
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
            
            <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Crie sua conta</h1>
            <p class="text-surface-500 mt-2">Acesse sua biblioteca musical adventista</p>
            
          </div>

        <app-card padding="lg">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
            
            <app-input
              id="name"
              label="Nome Completo"
              type="text"
              icon="person"
              placeholder="João Silva"
              formControlName="name"
              [error]="(registerForm.get('name')?.touched && registerForm.get('name')?.invalid) ? 'Nome é obrigatório' : ''"
            ></app-input>

            <app-input
              id="email"
              label="E-mail"
              type="email"
              icon="mail"
              placeholder="seu@email.com"
              formControlName="email"
              [error]="(registerForm.get('email')?.touched && registerForm.get('email')?.invalid) ? 'E-mail inválido' : ''"
            ></app-input>

            <app-input
              id="password"
              label="Senha"
              type="password"
              icon="lock"
              placeholder="••••••••"
              formControlName="password"
              [error]="(registerForm.get('password')?.touched && registerForm.get('password')?.invalid) ? 'A senha deve ter no mínimo 6 caracteres' : ''"
            ></app-input>

            <app-input
              id="confirmPassword"
              label="Confirmar Senha"
              type="password"
              icon="lock"
              placeholder="••••••••"
              formControlName="confirmPassword"
              [error]="(registerForm.get('confirmPassword')?.touched && registerForm.hasError('passwordMismatch')) ? 'As senhas não coincidem' : ''"
            ></app-input>

            <app-button 
              type="submit" 
              [fullWidth]="true" 
              size="lg"
              [disabled]="registerForm.invalid || isLoading()"
            >
              @if (isLoading()) {
                <mat-icon class="animate-spin mr-2">refresh</mat-icon> Criando conta...
              } @else {
                Criar Conta
              }
            </app-button>
          </form>
        </app-card>
        
        <p class="text-center text-sm text-surface-500 mt-8 font-medium">
          Já tem uma conta? <a routerLink="/login" class="text-primary-600 font-bold hover:underline">Faça login</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const { name, email, password } = this.registerForm.value;
      
      this.authService.register(name!, email!, password!).subscribe({
        next: () => {
          this.router.navigate(['/plans']);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }
}
