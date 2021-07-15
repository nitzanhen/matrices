import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements AfterViewInit {
  @Input() m!: Matrix;

  @ViewChild('matrixRef') matrixRef!: ElementRef<HTMLDivElement>;

  handleNumRowsChange(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const newValue = parseInt((e.target as HTMLInputElement).value);
    if (!isNaN(newValue)) {
      this.m.numRows = newValue;
    }
  }
  handleNumColumnsChange(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const newValue = parseInt((e.target as HTMLInputElement).value);
    if (!isNaN(newValue)) {
      this.m.numColumns = newValue;
    }
  }

  get matrixStyles() {
    return {
      'grid-template-rows': `repeat(${this.m.numRows}, auto)`,
      'grid-template-columns': `repeat(${this.m.numColumns}, auto)`
    };
  }

  get setFocus() {
    return this.m.setFocus.bind(this.m);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.m.gridRef = this.matrixRef.nativeElement;
  }

  rowTrackFn(index: number) {
    return index;
  }

  cellTrackFn(index: number) {
    return index;
  }
}
