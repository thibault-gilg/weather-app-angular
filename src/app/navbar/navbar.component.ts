import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public units = new Map<String, String>();


  constructor(public translate: TranslateService,
    private cookie: CookieService) {
    this.units.set("metric","°C");
    this.units.set("imperial","°F");
  }

  ngOnInit(): void {
  }

  //reload page when language is changed
  reloadPage(): void {
    window.location.reload();
  }

  saveUnit(unit: string): void {
    this.cookie.set("unit",unit);
    this.reloadPage();
  }
}
