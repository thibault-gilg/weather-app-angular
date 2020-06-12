import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private coordinatesRegex: RegExp = /^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$/;
  private apiKey = '0e613bc065bbac924796e909e4160d7b';
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  private language: string;

  private currentWeatherSubject = new Subject<any>();
  private forecastWeatherSubject = new Subject<any>();
  private latitude: number;
  private longitude: number;

  constructor(private http: HttpClient,
    private translate: TranslateService,
    private cookie: CookieService) {
    this.language = this.translate.currentLang;
  }

  //adapt the location for the GET request
  checkLocationType(location: string, stateCode: string, countryCode: string): string {
    if (this.coordinatesRegex.test(location)) {
      const splitlocation = location.split(', ', 2);
      var urlLocation: string = 'lat=' + splitlocation[0] + '&lon=' + splitlocation[1];
    }
    else if (stateCode == null){
      urlLocation = 'q=' + location + ',' + countryCode;
    }
    else {
      urlLocation = 'q=' + location + ',' + stateCode + ',' + countryCode;
    }
    return urlLocation;
  }

  //GET request to the API
  getCurrentWeather(location: string, stateCode: string, countryCode: string): void {
    const urlLocation = this.checkLocationType(location, stateCode, countryCode);
    this.currentWeatherSubject.next(this.http.get(
      this.apiUrl + '/weather?' + urlLocation + '&lang=' + this.language + '&units=' + this.cookie.get("unit") + '&appid=' + this.apiKey));
  }

  //create an observable for the CurrentWeather Component
  getCurrentObservable(): Observable<any> {
    return this.currentWeatherSubject.asObservable();
  }

  //retrieve coordinates from JSON object to call forecast weather API
  setLocationCoordinates(currentWeather: any): void {
    this.latitude = currentWeather.coord.lat;
    this.longitude = currentWeather.coord.lon;
  }

  //GET request to API with GPS coordinates
  getForecastWeather(): void {
    this.forecastWeatherSubject.next(this.http.get(
      this.apiUrl + '/onecall?lat=' + this.latitude + '&lon=' + this.longitude + '&lang=en' + '&units=metric' + '&exclude=minutely,hourly,current&appid=' + this.apiKey));
  }

  getForecastObservable(): Observable<any> {
    return this.forecastWeatherSubject.asObservable();
  }
}
