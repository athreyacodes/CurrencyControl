import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService, ICurrency, IEn8CurrencyObject } from '../currency.service';

@Component({
  selector: 'app-work-manager',
  templateUrl: './work-manager.component.html',
  styleUrls: ['./work-manager.component.scss']
})
export class WorkManagerComponent implements OnInit, OnDestroy {

  Amount: IEn8CurrencyObject;
  Symbol: string;
  Digit: string;
  Locale: string;
  CurrencyListArray: ICurrency[] = [];
  CurrencyList$: any;
  LanguageList: string[] = ['en-gb', 'en-us', 'fr-fr', 'de-de', 'ro-ro', 'ru-ru', 'hu-hu', 'pt-br', 'pl-pl', 'es-419', 'en-in'];
  ApplyDisabled: boolean;
  get ConfiguredCurrency() {
    return this.currencySrv.ConfiguredCurrency;
  }

  constructor(private currencySrv: CurrencyService) { }

  ngOnInit(): void {
    this.LoadCurrencyList();
    this.ApplyConfig(this.ConfiguredCurrency);
  }

  ngOnDestroy(): void {
    if (this.CurrencyList$) {
      this.CurrencyList$.unsubscribe();
    }
  }

  private LoadCurrencyList() {
    this.CurrencyList$ = this.currencySrv.getCurrencyCodes().subscribe(list => {
      this.CurrencyListArray = list;
    });
  }

  ApplyConfig(currency: any) {
    this.Amount = currency ?
      { code: currency.code, name: currency.name, value: 1000000 } as IEn8CurrencyObject :
      { value: 1000000 } as IEn8CurrencyObject;
    this.Symbol = this.currencySrv.Symbol;
    this.Digit = this.currencySrv.Digit;
    this.Locale = this.currencySrv.Locale;
    this.ApplyDisabled =true;
  }

  UpdateOtherConfiguration() {
    this.currencySrv.Symbol = this.Symbol;
    this.currencySrv.Digit = this.Digit;
    this.currencySrv.Locale = this.Locale;
    this.ApplyDisabled = false;
  }
}
