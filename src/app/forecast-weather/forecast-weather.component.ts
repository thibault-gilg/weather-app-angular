import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  public forecastWeatherSubscription: Subscription;
  public forecastWeather: any;
  public days: number; 
  
  constructor(private router: Router, private weatherService: WeatherService) { }

  ngOnInit(): void {
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
  
  OnDisplayForecast(days: number): void{
    this.days = days;
  }
}
