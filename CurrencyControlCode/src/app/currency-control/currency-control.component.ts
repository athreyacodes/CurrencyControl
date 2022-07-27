
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ICurrency, IEn8CurrencyObject } from "../currency.service";

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

    private innerValue: IEn8CurrencyObject = {} as IEn8CurrencyObject;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): IEn8CurrencyObject {
        return this.innerValue;
    }

    set value(value: IEn8CurrencyObject) {
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
        this.innerValue = (value || {}) as IEn8CurrencyObject;
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

    // Additional Functions if required while implementing
    onModelChange(v: any) {
        this.value.value = Number(v.replace(/[^0-9\.]/g, ""));
    }

    onCodeChange(v: any) {
        const curr = (this.CurrencyListArray || []).find(c => c.code === v);
        this.value.name = curr?.name || "";
    }
}

