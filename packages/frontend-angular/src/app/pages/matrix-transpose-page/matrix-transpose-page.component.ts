import { Component, OnInit } from '@angular/core';
import { transpose } from '@matrices/common';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix-transpose-page',
  templateUrl: './matrix-transpose-page.component.html',
  styles: []
})
export class MatrixTransposePageComponent implements OnInit {
  matrix1 = new Matrix();
  transposed = new Matrix({ unresizable: true, readonly: true });

  constructor() {}

  ngOnInit() {
    //Listen to the cells of both observables, and update cell accordingly.
    this.matrix1.cellsObserver.subscribe(cells => {
      const result = transpose(cells);
      if (result.ok) {
        this.transposed.cells = result.result;
      } else {
        this.transposed.clear();
      }
    });
  }
}
