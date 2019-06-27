import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GurunaviServiceService } from 'src/services/gurunavi-service.service';

export interface Lines {
  value: string;
  viewValue: string;
}

export interface Marker {
  lat: number;
  lng: number;
  restaurantName: string;
  physicalAddress: string;
  }


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
    // google maps zoom level
    zoom = 12;
    // Google map API variable
    title = 'My first AGM project';
    lat = 35.699624;
    lng = 139.784092;

    markers: Marker[] = [
      {
      lat: 35.699624,
      lng: 139.784092,
      restaurantName: 'サパナ',
      physicalAddress: '東京都文京区千駄木102202',
      },
      {
        lat: 35.695470,
        lng: 139.796942,
        restaurantName: '小僧寿し',
        physicalAddress: '東京都台東区まるまる4-2-5',
      },
      {
        lat: 35.731161,
        lng: 139.706486,
        restaurantName: 'すた丼',
        physicalAddress: '東京都練馬区まるまる8-3-5',
      },
      {
        lat: 35.626349,
        lng: 139.722472,
        restaurantName: 'Shake Sack',
        physicalAddress: '東京都港区5y-3-5',
      }
    ];

  model: any = {};
  isSelected = false;
  isSearched = false;
  formSubmitted = false;
  searchedRestaurantName = [];
  searchedRestaurantAddress = [];
  errorMessage = '';

  Object = Object;
  sampleObj = [];

  constructor(private gurunavi: GurunaviServiceService) { }


  selecteds: Lines[] = [
    // JR
    {value: '山手線', viewValue: 'JR山手線'},
    {value: '総武線', viewValue: 'JR総武線'},
    {value: '中央線', viewValue: 'JR中央線'},
    {value: '京浜東北線', viewValue: 'JR京浜東北線'},
    {value: '埼京線', viewValue: 'JR埼京線'},
    {value: '中央本線', viewValue: 'JR中央本線'},
    {value: '湘南新宿ライン', viewValue: 'JR湘南新宿ライン'},
    {value: '京葉線', viewValue: 'JR京葉線'},

    // 東京メトロ
    {value: '銀座線', viewValue: '地下鉄銀座線'},
    {value: '池袋線', viewValue: '地下鉄池袋線'},
    {value: '丸ノ内線', viewValue: '地下鉄丸ノ内線'},
    {value: '有楽町線', viewValue: '地下鉄有楽町線'},
    {value: '日比谷線', viewValue: '地下鉄日比谷線'},
    {value: '千代田線', viewValue: '地下鉄千代田線'},
    {value: '南北線', viewValue: '地下鉄南北線'},
    {value: '東西線', viewValue: '地下鉄東西線'},
    {value: '副都心線', viewValue: '地下鉄副都心線'},

    // 都営
    {value: '浅草線', viewValue: '都営浅草線'},
    {value: '三田線', viewValue: '都営三田線'},
    {value: '新宿線', viewValue: '都営新宿線'},
    {value: '大江戸線', viewValue: '都営大江戸線'},

    // 私鉄
    {value: '小田急線', viewValue: '小田急線'},
    {value: '京王線', viewValue: '京王線'},
    {value: '京急線', viewValue: '京急線'},
    {value: '京成線', viewValue: '京成線'},
    {value: '西武線', viewValue: '西武線'},
    {value: '東急線', viewValue: '東急線'},
    {value: 'りんかい線', viewValue: 'りんかい線'},
    {value: '東京モノレール', viewValue: '東京モノレール'},
    {value: '東武鉄道', viewValue: '東武鉄道'},
    {value: 'ゆりかもめ', viewValue: 'ゆりかもめ'},



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
      this.isSearched = !this.isSearched;
      // tslint:disable-next-line:no-string-literal
      const rests = data['rest'];
      console.log(rests);

      // variables for interface Lines
      let restaurantName = '';
      let restaurantAddress = '';
      let restaurantUrl = '';
      let nearestStation = '';
      let lng = '';
      let lat = '';
      let imageUrl = '';


      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < rests.length; index++) {
        // const element = rest[index];
        restaurantName = rests[index].name;
        restaurantAddress = rests[index].address;
        restaurantUrl = rests[index].url;
        nearestStation = rests[index].access.station;
        imageUrl = rests[index].image_url.shop_image1;

        lng = rests[index].longitude;
        lat = rests[index].latitude;

        // For debugging
        console.log('レストラン名　' + restaurantName);
        console.log('住所　' + restaurantAddress); // show all the result
        console.log('longtitude ' + lng); // show all the result
        console.log('latitude ' + lat); // show all the result
        // console.log(this.searchedRestaurantName);

        this.sampleObj.push({
          name : restaurantName,
          address : restaurantAddress,
          url: restaurantUrl,
          station : nearestStation,
          image : imageUrl,
          lng,
          lat
      });
      }

      // console.log(data);
    }, (error) => {

      console.log(error);

      this.errorMessage = 'There might be no result or There was something went wrong... You can try again later or try different search';
    } );
  }

}

