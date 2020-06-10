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

  private location: string;
  public weatherSearchForm: FormGroup;
  //Regexp to control the user's input : word or geographic coordinates (D,D)
  //whitespace regex not recongnized by typescript
  private inputRegex: string = "^[A-Za-z]+$|^([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))(\s*)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?)$";

  constructor(private weatherService: WeatherService,
    private formBuilder: FormBuilder,
    private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  //control the elements entered by the user
  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      input: new FormControl('', [Validators.required, Validators.pattern(this.inputRegex)])
    })
  }

  //retrieve user input
  get input(): AbstractControl {
    return this.weatherSearchForm.get('input');
  }

  //retrieve string value and call the WeatherService 
  onSubmitSearch(): void {
    const location: string = this.weatherSearchForm.value.input;
    this.weatherService.getCurrentWeather(location);
    //this.displayLastLocation(location);
  }
}
