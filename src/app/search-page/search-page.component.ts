import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Lines {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  model: any = {};
  isSelected = false;
  constructor() { }


  foods: Lines[] = [
    {value: '山手線', viewValue: '山手線'},
    {value: '総武線', viewValue: '総武線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '中央線', viewValue: '中央線'},
    {value: '京浜東北線', viewValue: '京浜東北線'},
    {value: '南武線', viewValue: '南武線'},
    {value: '埼京線', viewValue: '埼京線'},
    {value: '中央本線', viewValue: '中央本線'},
    {value: '湘南新宿ライン', viewValue: '湘南新宿ライン'},
    {value: '京葉線', viewValue: '京葉線'},
    {value: '高崎線', viewValue: '高崎線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
  ];

  ngOnInit() {
  }

  onClick() {
    this.isSelected = !this.isSelected;
  }

  onSubmit(form: NgForm) {
    this.model = '';
    console.log(form.value);
    // Form.value
  }

}
