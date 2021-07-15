import { Component, OnInit } from '@angular/core';
import { multiplyMatrices } from '@matrices/common';
import { zip } from 'rxjs';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix-multiplication-page',
  templateUrl: './matrix-multiplication-page.component.html',
  styles: [
  ]
})
export class MatrixMultiplicationPageComponent implements OnInit {

  matrix1 = new Matrix();
  matrix2 = new Matrix();
  product = new Matrix({ unresizable: true, readonly: true });

  constructor() { }

  ngOnInit() {
    //Listen to the cells of both observables, and update cell accordingly.
    zip(this.matrix1.cellsObserver, this.matrix2.cellsObserver)
      .subscribe(([cells1, cells2]) => {
        const result = multiplyMatrices(cells1, cells2);
        if (result.ok) {
          this.product.cells = result.result;
        }
        else {
          this.product.clear();
        }
      })
  }
}
