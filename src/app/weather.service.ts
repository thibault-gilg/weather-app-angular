import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  public currentWeather: any;
  public currentWeatherSubject = new Subject<any>();

  private coordinatesRegexp : string = "^([-+]?)([0-9]{1,2})(((\.)([0-9]+)(,)))(\s*)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?)$";
  private apiKey = '0e613bc065bbac924796e909e4160d7b';
  private apiUrl = 'http://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentWeather(location: any) {
    this.currentWeather = this.http.get(this.apiUrl+'/weather?q='+location+'&units=metric&appid='+this.apiKey);
    this.currentWeatherSubject.next(this.currentWeather);
  }
  
  getCurrentObservable(): Observable<any>{
    return this.currentWeatherSubject.asObservable();
  }

}
