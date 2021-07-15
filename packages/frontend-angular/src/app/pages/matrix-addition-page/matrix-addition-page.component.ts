import { Component } from '@angular/core';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-matrix-addition-page',
  templateUrl: './matrix-addition-page.component.html',
  styles: [
  ]
})
export class MatrixAdditionPageComponent {
  matrix1 = new Matrix();
  matrix2 = new Matrix();
  sum = new Matrix({ unresizable: true, readonly: true }); 

  constructor() { }
}
