import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GurunaviServiceService {


  endpointUrl = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=c3846d338bfd1dabe9808ac1502e992e';
  constructor(private http: HttpClient) { }

  getSearchResult(searchCriteria) {
    const freeWord  = '&freeword=';
    const hitPerPage = '&hit_per_page=15';
    const area = '&pref=PREF13'; // Tokyo
    // const fullUrl = this.mainUrl + this.hitPerPage + this.keyid + this.freeWord;
    return this.http.get(this.endpointUrl + freeWord + searchCriteria + hitPerPage + area);
  }
}
