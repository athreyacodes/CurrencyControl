import { Component, OnInit } from '@angular/core';
import { CurrencyService, ICurrency } from '../currency.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  CurrencyList: ICurrency[] = [];
  Loading: boolean;

  CurrencyControl = new FormControl('');
  FilteredCurrencyList: Observable<ICurrency[]>;

  get ConfiguredCurrency() {
    return this.CurrencyControl?.value;
  }

  constructor(private currencySrv: CurrencyService) { }

  ngOnInit() {
    this.Loading = true;
    this.currencySrv.getCurrencyCodes().subscribe(response => {
      this.CurrencyList = response.map((c: any) => ({ ...c, label: [c.code, c.name].join(" - ") }));
      const configuredCurrency = this.currencySrv.ConfiguredCurrency;
      if (configuredCurrency) {
        this.CurrencyControl.setValue(configuredCurrency);
      }
    }).add(() => {
      this.Loading = false;
    });

    this.FilteredCurrencyList = this.CurrencyControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const term = value?.code ? "" : (value || "").toLowerCase();
        return this.CurrencyList.filter(c => c && (c.code?.toLowerCase().includes(term) || c.name?.toLowerCase().includes(term)))
      }),
    );
  }

  UpdateConfiguredCurrecncyToAPI() {
    this.currencySrv.ConfiguredCurrency = this.ConfiguredCurrency;
  }

  displayFn(currency: ICurrency) {
    return currency?.code || "";
  }
}
