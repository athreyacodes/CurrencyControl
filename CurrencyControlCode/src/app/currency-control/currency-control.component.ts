// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-currency-control',
//   templateUrl: './currency-control.component.html',
//   styleUrls: ['./currency-control.component.scss']
// })
// export class CurrencyControlComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { ChangeDetectorRef, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ICurrency, IEn8CurrencyObject } from "../currency.service";
// import { TranslateService } from "@ngx-translate/core";
// import { DATA_DUMP_EVENT, OnDataDump } from "@shared/test/data-dumping.service";
// import { CaseFlowPacketForUI, ICardOption } from "../../display-packet.objects";

const noop = () => { };

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyControlComponent),
    multi: true,
};

@Component({
    selector: "app-currency-control",
    templateUrl: './currency-control.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class CurrencyControlComponent implements ControlValueAccessor {
    constructor() { }

    _currencyListArray: ICurrency[] = [];
    @Input()
    set CurrencyListArray(val: ICurrency[]) {
        if (val && this._currencyListArray !== val) {
            this._currencyListArray = val;
        }
    }
    get CurrencyListArray() {
        return this._currencyListArray;
    }

    @Input() disabled = false;
    @Input() readonly = false;
    @Input() style: any = {};
    @Input() class: any = "";

    // @Input() Symbol = "symbol-narrow";
    // @Input() Digit = "1.2";
    // @Input() Locale = "en";


    private innerValue: IEn8CurrencyObject = {} as IEn8CurrencyObject;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): IEn8CurrencyObject {
        return this.innerValue;
    }

    set value(value: IEn8CurrencyObject) {
        console.log(value);
        if (value?.code !== this.innerValue?.code) {
            this.innerValue = (value || {}) as IEn8CurrencyObject;
            this.onTouchedCallback();
            this.onChangeCallback(value);
            // this.OnChangeEnateActions();
        }
    }

    // OnChangeEnateActions() {
    //     this.Packet.AutoReassign().subscribe();
    //     this.Packet.PacketChange();
    // }

    writeValue(value: IEn8CurrencyObject) {
        this.innerValue = value || {} as IEn8CurrencyObject;
    }

    onModelChange(v: any) {
        this.value.value = Number(v.replace(/[^0-9\.]/g, ""))
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

