import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public path: string = '';

  private readonly pagenames = {
    '/matrix/sum': 'Matrix Addition',
    '/matrix/product': 'Matrix multiplication',
    '/matrix/transpose': 'Matrix transposition',
    '/matrix/determinant': 'Matrix determinant',
    '/vector/dot': 'Dot product',
    '/vector/cross': 'Cross product'
  }
  public get pagename() {
    return (this.pagenames as any)[this.path]
  }

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => (this.path = this.location.path()))
  }
}
