import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

export type InlineAlertType = 'error' | 'warn' | 'success' | 'info';

@Component({
  selector: 'app-inline-alert',
  imports: [MessageModule],
  templateUrl: './inline-alert.component.html',
  styleUrl: './inline-alert.component.scss',
})
export class InlineAlertComponent {
  type = input<InlineAlertType>('error');
  message = input<string | null | undefined>(null);
}
