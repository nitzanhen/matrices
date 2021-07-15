import { Component, OnInit } from '@angular/core';
import { determinant } from '@matrices/common';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix-determinant-page',
  templateUrl: './matrix-determinant-page.component.html',
  styles: []
})
export class MatrixDeterminantPageComponent implements OnInit {
  matrix1 = new Matrix();
  det = new Matrix({ unresizable: true, readonly: true, defaultCells: [[null]] });

  constructor() {}

  ngOnInit() {
    //Listen to the cells of both observables, and update cell accordingly.
    this.matrix1.cellsObserver.subscribe(cells => {
      const result = determinant(cells);
      if (result.ok) {
        this.det.cells = [[result.result]];
      } else {
        this.det.clear();
      }
    });
  }
}
