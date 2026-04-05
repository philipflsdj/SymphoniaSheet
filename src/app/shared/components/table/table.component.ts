import { Component, input, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="w-full overflow-x-auto bg-white rounded-2xl border border-surface-200 shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-50 border-b border-surface-200">
            @for (col of columns(); track col.key) {
              <th class="px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">
                {{ col.label }}
              </th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-200">
          @for (row of data(); track row.id || $index) {
            <tr class="hover:bg-surface-50 transition-colors">
              @for (col of columns(); track col.key) {
                <td class="px-6 py-4 text-sm text-surface-900">
                  <ng-container *ngTemplateOutlet="cellTemplate || defaultCell; context: { $implicit: row, column: col }"></ng-container>
                </td>
              }
            </tr>
          }
          @if (data().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length" class="px-6 py-8 text-center text-surface-500 text-sm">
                Nenhum dado disponível.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <ng-template #defaultCell let-row let-column="column">
      {{ row[column.key] }}
    </ng-template>
  `
})
export class TableComponent {
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);
  @ContentChild('cellTemplate') cellTemplate!: TemplateRef<any>;
}
