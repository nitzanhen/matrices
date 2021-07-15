import { Component } from '@angular/core';

@Component({
  selector: 'app-dot',
  template: `
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
    </svg>
  `,
  styles: []
})
export class DotComponent {
  constructor() {}
}
