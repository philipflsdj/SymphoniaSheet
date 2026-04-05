import { Component, input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      @if (label()) {
        <label [for]="id()" class="text-sm font-semibold text-surface-800">
          {{ label() }}
        </label>
      }
      <div class="relative">
        @if (icon()) {
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
            <mat-icon class="text-[20px] w-[20px] h-[20px]">{{ icon() }}</mat-icon>
          </div>
        }
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          (blur)="onTouched()"
          [class]="[
            'w-full rounded-xl border-2 border-surface-200 bg-white px-4 py-2.5 text-surface-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-0',
            icon() ? 'pl-10' : '',
            disabled ? 'bg-surface-50 text-surface-400 cursor-not-allowed' : ''
          ].join(' ')"
        />
      </div>
      @if (error()) {
        <span class="text-xs text-red-500 font-medium">{{ error() }}</span>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  id = input<string>(`input-${Math.random().toString(36).substring(2, 9)}`);
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  error = input<string>('');

  value: string = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
