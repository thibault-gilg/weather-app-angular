import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  //url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  //apiKey = '&units=metric&appid=0e613bc065bbac924796e909e4160d7b';

  constructor(private httpClient : HttpClient) {
   }

   //Unable to perform multiple search on the same session
  searchWeather(location : string){
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=0e613bc065bbac924796e909e4160d7b';
    this.httpClient.get(url).toPromise().then(array => {
      console.log(array);
    })
    
  }
}
