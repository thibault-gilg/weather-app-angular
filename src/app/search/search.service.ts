import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  url = 'http://api.openweathermap.org/data/2.5/weather?q=Dubai&units=metric&appid=0e613bc065bbac924796e909e4160d7b';
  searchResult = [];

  constructor(private httpClient : HttpClient) {
   }

  searchWeather(){
    this.httpClient.get(this.url).toPromise().then(array => {
      console.log(array);
    })
  }
}
