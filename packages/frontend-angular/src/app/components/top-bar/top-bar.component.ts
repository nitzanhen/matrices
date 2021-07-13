import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public pagename: string = '';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.pagename = this.location.path().slice(1);
  }
}
