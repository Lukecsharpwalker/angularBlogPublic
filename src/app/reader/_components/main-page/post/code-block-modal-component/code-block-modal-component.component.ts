import { Component, inject } from '@angular/core';
import { DYNAMIC_DIALOG_DATA } from '../../../../../shared/dynamic-dialog/dialog-data.token';

@Component({
  selector: 'app-code-block-modal',
  standalone: true,
  template: ` <pre
    [class]="data.language"
  ><code [innerHTML]="data.code"></code></pre>`,
  styles: [
    `
      :host {
        text-align: left;
        max-width: fit-content;
      }

      pre {
        max-width: fit-content;
        margin: 0;
        padding: 1rem;
        border-radius: 0.5rem;
      }
    `,
  ],
})
export class CodeBlockModalComponent {
  public data: CodeBlockModalData = inject(DYNAMIC_DIALOG_DATA, {
    optional: true,
  }) as CodeBlockModalData;
}

interface CodeBlockModalData {
  code: string;
  language: string;
}
