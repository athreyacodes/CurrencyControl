import { Component, OnInit } from '@angular/core';
import { CurrencyService, ICurrency } from './currency.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Currency Control';
  CurrentRoute: string;
  constructor(private currencySrv: CurrencyService, private router: Router) { }

  ngOnInit(): void {
    this.CurrentRoute = this.router.url;
  }
}
