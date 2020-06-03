import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Subscription, observable } from 'rxjs';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  public currentWeatherSubscription: Subscription;
  public currentWeather: any;

  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit(): void {
    this.currentWeatherSubscription = this.weatherService.getCurrentObservable()
      .subscribe(obs => {
        obs.subscribe(data => {
          this.currentWeather = data;
          this.sendLocation(this.currentWeather);
        },
      (error) => {
        this.router.navigate(['error404'])
      })
    });
  }

  //send the currentWeather object to the service
  sendLocation(currentWeather: any): void{
    this.weatherService.setLocationCoordinates(currentWeather);
  }

  onDisplayMore(): void{
    this.weatherService.getForecastWeather();
  }
  
}