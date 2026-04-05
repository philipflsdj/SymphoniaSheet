import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span 
      [class]="[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider',
        variantClasses[variant()]
      ].join(' ')"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'>('neutral');

  variantClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    success: 'bg-emerald-100 text-emerald-600',
    warning: 'bg-amber-100 text-amber-600',
    danger: 'bg-red-100 text-red-600',
    neutral: 'bg-surface-200 text-surface-700'
  };
}
