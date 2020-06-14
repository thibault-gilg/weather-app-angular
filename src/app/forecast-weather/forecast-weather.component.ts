import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ForecastWeather } from './forecast-weather';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  @Input() forecastWeather: ForecastWeather;

  public forecastWeatherSubscription: Subscription;
  public days: number;

  constructor(private router: Router,
    private weatherService: WeatherService,
    public cookie: CookieService) {
     }

  ngOnInit(): void {
    this.getForecastWeather();
  }

  //get ForecastWeather Observable
  getForecastWeather(): void {
    this.forecastWeatherSubscription = this.weatherService.getForecastObservable()
      .subscribe(obs => {
        obs.subscribe(data => {
          this.forecastWeather = data;
        },
          (error) => {
            this.router.navigate(['error404'])
          })
      });
  }

  //assign the number of days selected by the user
  OnDisplayForecast(days: number): void {
    this.days = days;
  }
}
