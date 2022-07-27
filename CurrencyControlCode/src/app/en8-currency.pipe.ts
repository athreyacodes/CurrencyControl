import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'en8Currency',
  pure: false
})
export class En8CurrencyPipe implements PipeTransform {

  constructor(private currencySrv: CurrencyService) { }

  private getSymbolFormat(format: 'code' | 'symbol-wide' | 'symbol-narrow' | string | boolean, currencyCode: string) {
    switch(format) {
      case null:
      case undefined:
      case false: return "";
      case "code": return currencyCode;
      case "symbol-wide": return getCurrencySymbol(currencyCode, "wide");
      case "symbol-narrow": return getCurrencySymbol(currencyCode, "narrow");
      default: return getCurrencySymbol(currencyCode, "narrow");
    }
  }

  transform(
    value: number,
    currencyCode: string = this.currencySrv.ConfiguredCurrency?.code,
    symbol:
        | 'code'
        | 'symbol-wide'
        | 'symbol-narrow'
        | string
        | boolean = this.currencySrv.Symbol,
    digitsInfo: string = this.currencySrv.Digit,
    locale: string = this.currencySrv.Locale,
): string | null {
    return formatCurrency(
      value,
      locale,
      this.getSymbolFormat(symbol, currencyCode),
      currencyCode,
      digitsInfo,
    );
}

}
