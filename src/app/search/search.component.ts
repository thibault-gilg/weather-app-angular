import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  weatherSearchForm: FormGroup;
  //Regexp to control the user's input : geographic coordinates (D,D) or word
  inputRegexp : string = "(^[A-Za-z]+$)|^([-+]?)([0-9]{1,2})(((\.)([0-9]+)(,)))(\s*)(([-+]?)([0-9]{1,3})((\.)([0-9]+))?)$";

  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder,
    private router: Router) { }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: new FormControl('', [Validators.required, Validators.pattern(this.inputRegexp)])
    })
  }

  get location() {
    return this.weatherSearchForm.get('location');
  }

  onSubmitSearch(): void {
    const location = this.weatherSearchForm.value.location;
    this.searchService.searchWeather(location);
    //this.router.navigate(['/'])
  }

}
