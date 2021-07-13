import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-operation-page',
  templateUrl: './operation-page.component.html',
  styleUrls: ['./operation-page.component.css']
})
export class OperationPageComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back()
  }
}
