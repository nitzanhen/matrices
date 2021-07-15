import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrossProductPageComponent } from './pages/cross-product-page/cross-product-page.component';
import { DotProductPageComponent } from './pages/dot-product-page/dot-product-page.component';
import { MatrixAdditionPageComponent } from './pages/matrix-addition-page/matrix-addition-page.component';
import { MatrixDeterminantPageComponent } from './pages/matrix-determinant-page/matrix-determinant-page.component';
import { MatrixMultiplicationPageComponent } from './pages/matrix-multiplication-page/matrix-multiplication-page.component';
import { MatrixTransposePageComponent } from './pages/matrix-transpose-page/matrix-transpose-page.component';

import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'matrix/sum', component: MatrixAdditionPageComponent },
  { path: 'matrix/product', component: MatrixMultiplicationPageComponent },
  { path: 'matrix/transpose', component: MatrixTransposePageComponent },
  { path: 'matrix/determinant', component: MatrixDeterminantPageComponent },
  { path: 'vector/dot', component: DotProductPageComponent },
  { path: 'vector/cross', component: CrossProductPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
