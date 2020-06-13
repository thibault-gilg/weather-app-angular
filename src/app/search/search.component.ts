import { Component, OnInit, Injectable } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  //Regex to control the user's input: word or geographic coordinates (D,D)
  private locationRegex: string = "^ *([A-Za-z] *)+$|^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$";
  //Regex: two letters only (state and country codes)
  private codeRegex: string = "^ *[A-Za-z]{2} *$";
  private coordinatesRegex: RegExp = /^ *([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))( +)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?) *$/;


  constructor(private weatherService: WeatherService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
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
    return this.weatherSearchForm.get('stateCode')
  }

  get countryCode() {
    return this.weatherSearchForm.get('countryCode')
  }

  //retrieve string value and call the WeatherService 
  onSubmitSearch(): void {
    const location: string = this.weatherSearchForm.value.location;
    const stateCode: string = this.weatherSearchForm.value.stateCode;
    const countryCode: string = this.weatherSearchForm.value.countryCode;
    this.weatherService.getCurrentWeather(location, stateCode, countryCode);
  }

  setConditionalValidators() {
    const countryCodeControl = this.weatherSearchForm.get('countryCode');
    const stateCodeControl = this.weatherSearchForm.get('stateCode');
    this.weatherSearchForm.get('stateCode').valueChanges
      .subscribe(stateCode => {
        countryCodeControl.setValidators(Validators.required)
        countryCodeControl.updateValueAndValidity();
      });
    this.weatherSearchForm.get('location').valueChanges
      .subscribe(location => {
        if (this.coordinatesRegex.test(location)){
          countryCodeControl.disable();
          stateCodeControl.disable();
        }
      })
  }
}
