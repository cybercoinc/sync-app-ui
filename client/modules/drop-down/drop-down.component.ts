import { Component, ElementRef, Input, OnInit, forwardRef, ViewChild } from "@angular/core";
import { DropDownMixin } from "./drop-down.mixin";
import { DropDownItemComponent } from "./item/drop-down-item.component";
import { AuthService } from "client/service/auth.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop } from "rxjs/util/noop";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true
};

@Component({
    selector: 'drop-down',
    host: {
        '(document:click)': 'onClick($event)',
    },
    templateUrl: 'client/modules/drop-down/drop-down.component.html',
    styleUrls:  ['client/modules/drop-down/drop-down.css'],
    providers:  [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DropDownComponent implements OnInit, ControlValueAccessor {
    @Input('service')      service:      DropDownMixin;
    @Input('searchEnable') searchEnable: boolean                      = false;
    @Input('items')        items                                      = [];
    @Input('placeholder')  placeholder:  string                       = 'Select Item';
    @Input('multiple')     multiple:     boolean                      = false;

    @ViewChild('input') input: ElementRef;

    private _onChangeCallback:  (value: any) => void = noop;
    private _onTouchedCallback: (value: any) => void = noop;

    selected:   DropDownItemComponent = null;
    isVisible:  boolean               = false;
    searchText: string;

    constructor(private _eref: ElementRef, private user: AuthService) {}

    ngOnInit(): void {
        if (this.service) {
            this.service.getData(this.user.authTokenId);
        }
    }

    ngDoCheck() {
        if (this.input) {
            this.input.nativeElement.focus();
        }
    }

    toggle() {
        this.isVisible = !this.isVisible;
    }

    close() {
        this.searchText = null;
        this.isVisible = false;
    }

    selectItem(item: DropDownItemComponent) {
        this.selected  = item;
        this._onChangeCallback(this.items);

        this.close();
    }

    public get placeholderDisplay(): string {
        if (this.selected)
            return this.selected.value;

        return this.placeholder;
    }

    onClick(event) {
        event.stopPropagation();

        if (!this._eref.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    writeValue(value: any): void {}
    setDisabledState(isDisabled: boolean): void {}
}
