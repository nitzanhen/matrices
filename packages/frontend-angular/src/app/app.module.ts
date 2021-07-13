import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { GithubComponent } from './components/svg/github/github.component';
import { PlusComponent } from './components/svg/plus/plus.component';
import { MultiplyComponent } from './components/svg/multiply/multiply.component';
import { EqualComponent } from './components/svg/equal/equal.component';
import { DotComponent } from './components/svg/dot/dot.component';
import { TipComponent } from './components/svg/tip/tip.component';
import { RightArrowComponent } from './components/svg/right-arrow/right-arrow.component';
import { OperationPageComponent } from './pages/operation-page/operation-page.component';
import { MatrixAdditionPageComponent } from './pages/matrix-addition-page/matrix-addition-page.component';
import { MatrixMultiplicationPageComponent } from './pages/matrix-multiplication-page/matrix-multiplication-page.component';
import { MatrixTransposePageComponent } from './pages/matrix-transpose-page/matrix-transpose-page.component';
import { MatrixDeterminantPageComponent } from './pages/matrix-determinant-page/matrix-determinant-page.component';
import { DotProductPageComponent } from './pages/dot-product-page/dot-product-page.component';
import { CrossProductPageComponent } from './pages/cross-product-page/cross-product-page.component';
import { BackArrowComponent } from './components/svg/back-arrow/back-arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    TopBarComponent,
    GithubComponent,
    PlusComponent,
    MultiplyComponent,
    EqualComponent,
    DotComponent,
    TipComponent,
    RightArrowComponent,
    OperationPageComponent,
    MatrixAdditionPageComponent,
    MatrixMultiplicationPageComponent,
    MatrixTransposePageComponent,
    MatrixDeterminantPageComponent,
    DotProductPageComponent,
    CrossProductPageComponent,
    BackArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
