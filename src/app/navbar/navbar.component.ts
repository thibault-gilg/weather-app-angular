import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public units = new Map<string, Array<string>>();
  private defaultSystem: string = "imperial";
  private defaultUnit: string = "°F";
  private defaultSpeed: string = "mph";

  constructor(public translate: TranslateService, public cookie: CookieService) {
    this.units.set("metric", ["°C", "m/s"]);
    this.units.set("imperial", ["°F", "mph"]);
    this.setDefaultUnit();
  }

  ngOnInit(): void {
  }

  //set default unit system in cookies with an expiry time of 30 days if the cookies don't exist
  setDefaultUnit(): void {
    if (!this.cookie.check("system")) {
      this.cookie.set("system", this.defaultSystem, 30);
      this.cookie.set("unit", this.defaultUnit, 30);
      this.cookie.set("speed", this.defaultSpeed, 30);
    }
  }

  //reload page when language is changed to apply changes in the API request
  reloadPage(): void {
    window.location.reload();
  }

  //store the selected unit data in cookies
  saveUnit(unit: string): void {
    const splitUnit = unit.split(',', 3);
    this.cookie.set("system", splitUnit[0], 30);
    this.cookie.set("unit", splitUnit[1], 30);
    this.cookie.set("speed", splitUnit[2], 30);
    this.reloadPage();
  }
}
