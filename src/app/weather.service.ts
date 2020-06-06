import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private cityRegex : RegExp = /^[A-Za-z]+$/;
  private apiKey = '0e613bc065bbac924796e909e4160d7b';
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  
  private currentWeatherSubject = new Subject<any>();
  private forecastWeatherSubject = new Subject<any>();
  private latitude: number;
  private longitude: number;
  private location: string;

  constructor(private http: HttpClient, private router: Router) {}

  checkInputType(input: string): string{
    if(this.cityRegex.test(input)){
      var inputString: string = 'q='+input;
    }
    else{
      const splitInput = input.split(',',2);
      inputString = 'lat='+splitInput[0]+'&lon='+splitInput[1];
    }
    return inputString;
  }

  getCurrentWeather(location: string): void {
    const locationString = this.checkInputType(location);
    this.currentWeatherSubject.next(this.http.get(
      this.apiUrl+'/weather?'+ locationString +'&units=metric&appid='+this.apiKey));
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
