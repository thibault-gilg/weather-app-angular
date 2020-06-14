import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { CurrentWeather } from './current-weather/current-weather';
import { ForecastWeather } from './forecast-weather/forecast-weather';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private coordinatesRegex: RegExp = /^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$/;
  private apiKey = '0e613bc065bbac924796e909e4160d7b';
  private apiUrl = 'http://api.openweathermap.org/data/2.5';
  private language: string;
  private forecastWeatherSubject = new Subject<any>();
  private system: string;

  constructor(private http: HttpClient,
    private translate: TranslateService,
    private cookie: CookieService
  ) {
    this.language = this.translate.currentLang;
    this.system = this.cookie.get("system");
  }

  //adapt the location for the GET request
  checkLocationType(location: string, stateCode?: string, countryCode?: string): string {
    //geographic coordinates
    if (this.coordinatesRegex.test(location)) {
      const splitLocation = location.split(', ', 2);
      var urlLocation: string = 'lat=' + splitLocation[0] + '&lon=' + splitLocation[1];
    }
    //no state code
    else if (stateCode == null) {
      urlLocation = 'q=' + location + ',' + countryCode;
    }
    else {
      urlLocation = 'q=' + location + ',' + stateCode + ',' + countryCode;
    }
    return urlLocation;
  }

  //GET request to the API (optional paremeters)
  getCurrentWeather(location: string, stateCode?: string, countryCode?: string): Observable<CurrentWeather> {
    const urlLocation = this.checkLocationType(location, stateCode, countryCode);
    return this.http.get<CurrentWeather>(
      this.apiUrl + '/weather?' + urlLocation + '&lang=' + this.language + '&units=' + this.system + '&appid=' + this.apiKey);
  }

  //GET request to API with GPS coordinates
  getForecastWeather(latitude: number, longitude: number): void {
    this.forecastWeatherSubject.next(this.http.get(
      this.apiUrl + '/onecall?lat=' + latitude + '&lon=' + longitude + '&lang=' + this.language + '&units=' + this.system + '&exclude=minutely,hourly,current&appid=' + this.apiKey));
  }

  //create an observable for the ForecastWeather Component
  getForecastObservable(): Observable<Observable<ForecastWeather>> {
    return this.forecastWeatherSubject.asObservable();
  }
}
