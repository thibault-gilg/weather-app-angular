import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  //title on the navbar
  title = "The weather of your favorite location"

  constructor() { }

  ngOnInit(): void {
  }

}
