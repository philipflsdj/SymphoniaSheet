import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      [class]="[
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClasses[size()],
        variantClasses[variant()],
        fullWidth() ? 'w-full' : '',
        disabled() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
      ].join(' ')"
    >
      @if (icon()) {
        <mat-icon class="mr-2 text-[20px] w-[20px] h-[20px]">{{ icon() }}</mat-icon>
      }
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);
  icon = input<string>('');
  
  onClick = output<MouseEvent>();

  sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm',
    outline: 'border-2 border-surface-200 text-surface-800 hover:bg-surface-100 focus:ring-surface-200',
    ghost: 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus:ring-surface-200'
  };
}
