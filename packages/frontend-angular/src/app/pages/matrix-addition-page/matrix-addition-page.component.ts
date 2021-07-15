import { Component, OnInit } from '@angular/core';
import { addMatrices } from '@matrices/common';
import { zip } from 'rxjs';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix-addition-page',
  templateUrl: './matrix-addition-page.component.html',
  styles: [
  ]
})
export class MatrixAdditionPageComponent implements OnInit {
  matrix1 = new Matrix();
  matrix2 = new Matrix();
  sum = new Matrix({ unresizable: true, readonly: true }); 

  constructor() { }

  ngOnInit() {
    //Listen to the cells of both observables, and update cell accordingly.
    zip(this.matrix1.cellsObserver, this.matrix2.cellsObserver)
      .subscribe(([cells1, cells2]) => {
        const result = addMatrices(cells1, cells2);
        if(result.ok) {
          this.sum.cells = result.result;
        }
        else {
          this.sum.clear();
        }
      })
  }
}
