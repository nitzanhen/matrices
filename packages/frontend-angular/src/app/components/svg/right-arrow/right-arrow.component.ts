import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-arrow',
  template: `
    <svg viewBox="0 0 24 24">
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
  `,
  styles: []
})
export class RightArrowComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
