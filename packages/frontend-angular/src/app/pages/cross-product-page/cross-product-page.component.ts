import { Component, OnInit } from '@angular/core';
import { crossProduct, generateVector } from '@matrices/common';
import { zip } from 'rxjs';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-cross-product-page',
  templateUrl: './cross-product-page.component.html',
  styles: []
})
export class CrossProductPageComponent implements OnInit {
  vector1 = new Matrix({ unresizable: true, defaultCells: [generateVector(3)] });
  vector2 = new Matrix({ unresizable: true, defaultCells: [generateVector(3)] });

  product = new Matrix({ unresizable: true, readonly: true, defaultCells: [generateVector(3)] });

  constructor() {}

  ngOnInit(): void {
    zip(this.vector1.cellsObserver, this.vector2.cellsObserver).subscribe(([v1, v2]) => {
      const [u] = v1;
      const [v] = v2;

      const result = crossProduct(u, v);
      if (result.ok) {
        this.product.cells = [result.value];
      } else {
        this.product.clear();
      }
    });
  }
}
