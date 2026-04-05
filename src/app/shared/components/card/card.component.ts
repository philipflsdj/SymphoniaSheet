import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div 
      [class]="[
        'bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-200',
        hoverable() ? 'hover:shadow-md hover:border-surface-300 cursor-pointer' : 'shadow-sm',
        paddingClasses[padding()]
      ].join(' ')"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  hoverable = input<boolean>(false);
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');

  paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };
}
