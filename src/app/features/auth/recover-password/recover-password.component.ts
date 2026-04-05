import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, ButtonComponent, InputComponent, CardComponent, RouterLink],
  template: `
    <div class="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-4">
            <mat-icon class="text-[32px] w-[32px] h-[32px]">lock_reset</mat-icon>
          </div>
          <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Recuperar Senha</h1>
          <p class="text-surface-500 mt-2">Enviaremos um link para redefinir sua senha</p>
        </div>

        <app-card padding="lg">
          @if (isSubmitted()) {
            <div class="text-center py-4">
              <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-[32px] w-[32px] h-[32px]">check_circle</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-surface-900 mb-2">E-mail enviado!</h3>
              <p class="text-surface-500 mb-6">
                Verifique sua caixa de entrada e siga as instruções para criar uma nova senha.
              </p>
              <app-button routerLink="/login" [fullWidth]="true" variant="outline">Voltar para o Login</app-button>
            </div>
          } @else {
            <form [formGroup]="recoverForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
              <app-input
                id="email"
                label="E-mail"
                type="email"
                icon="mail"
                placeholder="seu@email.com"
                formControlName="email"
                [error]="(recoverForm.get('email')?.touched && recoverForm.get('email')?.invalid) ? 'E-mail inválido' : ''"
              ></app-input>

              <app-button 
                type="submit" 
                [fullWidth]="true" 
                size="lg"
                [disabled]="recoverForm.invalid || isLoading()"
              >
                @if (isLoading()) {
                  <mat-icon class="animate-spin mr-2">refresh</mat-icon> Enviando...
                } @else {
                  Enviar Link
                }
              </app-button>
            </form>
          }
        </app-card>
        
        @if (!isSubmitted()) {
          <p class="text-center text-sm text-surface-500 mt-8 font-medium">
            Lembrou a senha? <a routerLink="/login" class="text-primary-600 font-bold hover:underline">Voltar para o login</a>
          </p>
        }
      </div>
    </div>
  `
})
export class RecoverPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = signal(false);
  isSubmitted = signal(false);

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.recoverForm.valid) {
      this.isLoading.set(true);
      const { email } = this.recoverForm.value;
      
      this.authService.recoverPassword(email!).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isSubmitted.set(true);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }
}
