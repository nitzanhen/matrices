import { Component, OnInit } from '@angular/core';
import { dotProduct, generateVector } from '@matrices/common';
import { zip } from 'rxjs';

import { Matrix } from 'src/Matrix';

@Component({
  selector: 'app-dot-product-page',
  templateUrl: './dot-product-page.component.html',
  styles: []
})
export class DotProductPageComponent implements OnInit {
  vector1 = new Matrix({ unresizable: true, defaultCells: [generateVector(3)] });
  vector2 = new Matrix({ unresizable: true, defaultCells: [generateVector(3)] });

  product = new Matrix({ unresizable: true, readonly: true, defaultCells: [[null]] });

  constructor() {}

  ngOnInit(): void {
    zip(this.vector1.cellsObserver, this.vector2.cellsObserver).subscribe(([v1, v2]) => {
      const [u] = v1;
      const [v] = v2;

      const result = dotProduct(u, v);
      if (result.ok) {
        this.product.cells = [[result.value]];
      } else {
        this.product.clear();
      }
    });
  }
}
