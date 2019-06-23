import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GurunaviServiceService } from 'src/services/gurunavi-service.service';

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
  formSubmitted = false;
  searchedRestaurantName = [];
  searchedRestaurantAddress = [];
  errorMessage = '';

  Object = Object;
  sampleObj = [];

  constructor(private gurunavi: GurunaviServiceService) { }


  selecteds: Lines[] = [
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
    {value: '新宿線', viewValue: '新宿線'},
    {value: '池袋線', viewValue: '池袋線'},
    {value: '丸ノ内線', viewValue: '丸ノ内線'},
    {value: '有楽町線', viewValue: '有楽町線'},
    {value: '日比谷線', viewValue: '青梅線'},
    {value: '千代田線', viewValue: '千代田線'},
    {value: '南北線', viewValue: '南北線'},
    {value: '東西線', viewValue: '東西線'},
    {value: '副都心線', viewValue: '副都心線'},
    {value: '半蔵門線', viewValue: '半蔵門線'},
    {value: '青梅線', viewValue: '青梅線'},
    {value: '青梅線', viewValue: '青梅線'},
  ];

  ngOnInit() {
  }

  onClick() {
    this.isSelected = !this.isSelected;
  }

  onSubmit(form: NgForm) {
    this.formSubmitted = !this.formSubmitted;
    // tslint:disable-next-line:no-unused-expression
    this.errorMessage = '';
    this.sampleObj = [];
    // If you want to delete after the search
    // this.model = {};

    const lineValue = form.value.line;
    const selectedValue = form.value.selected;
    let freeWord = form.value.freeWord;

    if (freeWord === undefined) {
      freeWord = ' ';
    }

    // console.log(form.value.line);
    console.log('駅名：　' + form.value.selected);
    console.log('フリーワード：　' + form.value.freeWord);
    // Form.value


    this.gurunavi.getSearchResult(selectedValue + ',' + freeWord )
    .subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      const rests = data['rest'];
      console.log(rests);

      // tslint:disable-next-line:no-string-literal
      let restaurantName = rests['name'];
      // tslint:disable-next-line:no-string-literal
      let restaurantAddress = rests['address'];
      // tslint:disable-next-line:no-string-literal
      let restaurantUrl = rests['url'];
      let nearestStation = '';


      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < rests.length; index++) {
        // const element = rest[index];
        // tslint:disable-next-line:no-string-literal
        restaurantName = rests[index]['name'];
        // tslint:disable-next-line:no-string-literal
        restaurantAddress = rests[index]['address'];
        // tslint:disable-next-line:no-string-literal
        restaurantUrl = rests[index]['url'];
        // tslint:disable-next-line:no-string-literal
        nearestStation = rests[index]['access']['station'];
        console.log('レストラン名　' + restaurantName);
        console.log('住所　' + restaurantAddress); // show all the result

        // console.log(this.searchedRestaurantName);

        this.sampleObj.push({
          name : restaurantName,
          address : restaurantAddress,
          url: restaurantUrl,
          station : nearestStation
      });
      }

      // console.log(data);
    }, (error) => {

      console.log(error);

      this.errorMessage = 'There might be no result or There was something went wrong... You can try again later or try different search';
    } );
  }

}
