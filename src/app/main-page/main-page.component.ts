import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  // This variable is to change css class for image pics
  textCol = 'col';
  clientWidth: number = document.documentElement.clientWidth;

  constructor() { }

  ngOnInit() {
    if (this.clientWidth < 375) {
      this.textCol = 'smallCol';
    }
  }



}
