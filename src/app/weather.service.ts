import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private coordinatesRegexp : string = "^([-+]?)([0-9]{1,2})(((\.)([0-9]+)(,)))(\s*)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?)$";
  private apiKey = '0e613bc065bbac924796e909e4160d7b';
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  
  private currentWeatherSubject = new Subject<any>();
  private forecastWeatherSubject = new Subject<any>();
  private latitude: number;
  private longitude: number;

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentWeather(location: any): void {
    this.currentWeatherSubject.next(this.http.get(
      this.apiUrl+'/weather?q='+location+'&units=metric&appid='+this.apiKey));
  }

  //create an observable for the CurrentWeather Component
  getCurrentObservable(): Observable<any>{
    return this.currentWeatherSubject.asObservable();
  }

  setLocationCoordinates(currentWeather: any): void{
    this.latitude = currentWeather.coord.lat;
    this.longitude = currentWeather.coord.lon;
  }

  getForecastWeather(): void{
    this.forecastWeatherSubject.next(this.http.get(
      this.apiUrl+'/onecall?lat='+this.latitude+'&lon='+this.longitude+'&exclude=minutely,hourly,current&units=metric&appid='+this.apiKey));
  }

  getForecastObservable(): Observable<any>{
    return this.forecastWeatherSubject.asObservable();
  }

}
