import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  public currentWeather: any;
  weatherSearchForm: FormGroup;
  //Regexp to control the user's input : geographic coordinates (D,D) or word
  inputRegex : string = "^[A-Za-z]+$|^([-+]?)([0-9]{1,2})((((\.)([0-9]+))?(,)))(\s*)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?)$";

  constructor(private weatherService: WeatherService,
              private formBuilder: FormBuilder,
              private router: Router) 
              { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: new FormControl('', [Validators.required, Validators.pattern(this.inputRegex)])
    })
  }
  
  get location() {
    return this.weatherSearchForm.get('location');
  }

  onSubmitSearch(): void {
    const location: string = this.weatherSearchForm.value.location;
    this.weatherService.getCurrentWeather(location);
  }

}
