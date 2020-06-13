import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Subscription, observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  public currentWeatherSubscription: Subscription;
  public currentWeather: any;
  public localTime: number;

  constructor(private weatherService: WeatherService,
    private router: Router,
    private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.displayCurrentWeather();
  }

  displayCurrentWeather() {
    this.currentWeatherSubscription = this.weatherService.getCurrentObservable()
      .subscribe(obs => {
        obs.subscribe(data => {
          this.currentWeather = data;
          this.sendLocation(this.currentWeather);
          this.weatherService.getForecastWeather();
          this.getLocalTime();
        },
          (error) => {
            this.router.navigate(['error404'])
          })
      });
  }

  getLocalTime(){
    const date = new Date();
    const utcTime = date.getTime()+ (date.getTimezoneOffset() * 60000);
    this.localTime = utcTime + 1000*this.currentWeather.timezone;
  }

  //send the currentWeather object to the service to make a GET request for forecast weather
  sendLocation(currentWeather: any): void {
    this.weatherService.setLocationCoordinates(currentWeather);
  }

  //check if imperial system
  isImperial() {
    var ret: boolean;
    if (this.cookie.get("unit") == "imperial") {
      ret = true;
    }
    return ret;
  }

}
