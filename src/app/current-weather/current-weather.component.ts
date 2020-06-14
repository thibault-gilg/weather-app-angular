import { Component, OnInit, Injectable, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CurrentWeather } from './current-weather';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {

  @Input() currentWeather: CurrentWeather;

  public weatherSearchForm: FormGroup;
  //Regex to control the user's input: city or geographic coordinates (D,D)
  private locationRegex: string = "^ *([A-Za-z](-' )*)+|^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$";
  //Regex: two letters only (state and country codes)
  private codeRegex: string = "^ *[A-Za-z]{2} *$";
  private coordinatesRegex: RegExp = /^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$/;
  public localTime: number;

  constructor(private weatherService: WeatherService,
    private formBuilder: FormBuilder,
    private router: Router,
    public cookie: CookieService) {
  }

  ngOnInit(): void {
    this.initForm();
    //remenber last searched location
    if (this.cookie.check("location")) {
      this.getCurrentWeather(this.cookie.get("location"));
    }
  }

  //control the elements entered by the user
  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [null, [Validators.required, Validators.pattern(this.locationRegex)]],
      stateCode: [null, [Validators.pattern(this.codeRegex)]],
      countryCode: [null, [Validators.pattern(this.codeRegex)]],
    })
  }

  //getters for the form values
  get location(): AbstractControl {
    return this.weatherSearchForm.get('location');
  }

  get stateCode() {
    return this.weatherSearchForm.get('stateCode');
  }

  get countryCode() {
    return this.weatherSearchForm.get('countryCode');
  }

  //retrieve entered values to make API request 
  onSubmitSearch(): void {
    const location: string = this.weatherSearchForm.value.location;
    const stateCode: string = this.weatherSearchForm.value.stateCode;
    const countryCode: string = this.weatherSearchForm.value.countryCode;

    this.getCurrentWeather(location, stateCode, countryCode);
    //clear the search boxes after submitting search
    this.weatherSearchForm.reset();
  }

  getCurrentWeather(location: string, stateCode?: string, countryCode?: string) {
    this.weatherService.getCurrentWeather(location, stateCode, countryCode)
      .subscribe(data => {
        this.currentWeather = data;
        this.weatherService.getForecastWeather(this.currentWeather.coord.lat, this.currentWeather.coord.lon);
        this.getLocalTime();
        this.saveLocation();
      },
        //display error 404 page if error
        (error) => {
          this.router.navigate(['error404'])
        });
  }

  //get the actual time of the searched location
  getLocalTime() {
    const date = new Date();
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    this.localTime = utcTime + 1000 * this.currentWeather.timezone;
  }

  //store the geographic coordinates (precise location) in a cookie
  saveLocation() {
    const location: string = this.currentWeather.coord.lat.toString() + ', ' + this.currentWeather.coord.lon.toString();
    this.cookie.set("location", location, 30);
  }
}
