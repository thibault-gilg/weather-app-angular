import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  public forecastWeatherSubscription: Subscription;
  public forecastWeather: any;
  public days: number;

  constructor(private router: Router,
    private weatherService: WeatherService,
    public cookie: CookieService) {
     }

  ngOnInit(): void {
    this.displayForecastWeather();
  }

  displayForecastWeather(): void {
    this.forecastWeatherSubscription = this.weatherService.getForecastObservable()
      .subscribe(obs => {
        obs.subscribe(data => {
          this.forecastWeather = data.daily;
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
