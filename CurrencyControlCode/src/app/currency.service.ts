import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, concatMap, delay } from 'rxjs/operators';

export interface ICurrency {
  code: string;
  numCode: string;
  name: string;
  label: string;
}

export interface IEn8CurrencyObject {
  code: string;
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private pathname;

  // Configuration to be saved under Contract
  private _ConfiguredCurrency: ICurrency;
  get ConfiguredCurrency() {
    return this._ConfiguredCurrency;
  }
  set ConfiguredCurrency(v) {
    this._ConfiguredCurrency = v;
    localStorage.setItem("CONFIGURED_CURRENCY_CODE", JSON.stringify(v));
  }

  // Other configurations (to be saved?)
  Symbol: string = "symbol-narrow";
  Digit: string = "1.2";
  Locale: string = "en-gb";

  // To be loaded only once
  CurrencyList: ICurrency[] = [];

  constructor(private http: HttpClient) {
    this.pathname = environment.production ?
      window.location.pathname :
      "../";

    if (localStorage.getItem("CONFIGURED_CURRENCY_CODE")) {
      this.ConfiguredCurrency = JSON.parse(localStorage.getItem("CONFIGURED_CURRENCY_CODE") || "");
    }
  }

  private getJSON(): Observable<any> {
    return this.http.get(this.pathname + "assets/currency-codes.json");
  }

  getCurrencyCodes() {
    return this.CurrencyList?.length ?
      of(this.CurrencyList) :
      this.getJSON()
        .pipe(concatMap(r => of(r).pipe(delay(200))))
        .pipe(tap(r => (this.CurrencyList = r)));
  }
}
