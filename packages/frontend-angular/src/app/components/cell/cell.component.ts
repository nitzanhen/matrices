import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CellValue } from '@matrices/common';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() readonly!: boolean;
  @Input() value!: CellValue;
  @Output() valueChange = new EventEmitter<CellValue>();

  @Input() row!: number;
  @Input() column!: number;
  @Input() setFocus!: (row: number, column: number) => void;
 
  constructor() { }

  handleChange(e: Event): void {
    const { value: rawValue } = e.currentTarget as HTMLInputElement;

    if (rawValue === '') {
      //return this.valueChange.emit(null);
    }

    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      this.valueChange.emit(parsed);
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    const el = e.target as HTMLInputElement;

    console.log(this.row, this.column)

    switch (e.key) {
      case 'ArrowLeft': {
        if (el.selectionStart === 0) {
          e.preventDefault();
          e.stopPropagation();
          this.setFocus(this.row, this.column - 1);
        }
        break;
      }
      case 'ArrowRight': {
        if (!this.value || el.selectionStart === String(this.value).length) {
          e.preventDefault();
          e.stopPropagation();
          this.setFocus(this.row, this.column + 1);
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        e.stopPropagation();
        this.setFocus(this.row - 1, this.column);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        e.stopPropagation();
        this.setFocus(this.row + 1, this.column);
        break;
      }
    }
  }

}
