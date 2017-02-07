import { Component, ElementRef, Input, Output, EventEmitter, forwardRef, ViewChild } from "@angular/core";
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
    template: `
        <div class="drop-down">
            <div class="drop-down-header" (click)="toggle()">
                <span class="item select">{{placeholderDisplay}}</span>
                <span class="arrow"></span>
            </div>
        
            <div *ngIf="isVisible" class="drop-down-body">
                <div *ngIf="searchEnable">
                    <input #input type="text" placeholder="search text" [(ngModel)]="searchText">
                </div>
        
                <div class="drop-down-items">
                    <drop-down-item
                            *ngFor="let item of items | search: searchText"
                            [name]="item.name"
                            [value]="item.value"
                            [ngClass]="{'selected': item == selected}"
                            (select)="selectItem($event)">
                    </drop-down-item>
                </div>
            </div>
        </div>`,
    styles:  [`
        :host .drop-down-header {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            border-bottom: 1px solid rgba(0,0,0,.12);
        }
        
        :host .drop-down-body {
            z-index: 1;
            position: absolute;
            box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
        }
        
        :host .arrow {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid;
            margin: 0 4px;
        }
        
        :host .item {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            padding: 10px;
        }
        
        :host button {
            width: 100%;
        }
        
        :host input {
            width: 100%;
            padding-left: 10px;
        }
        
        :host .selected {
            background-color: #e4e4e4;
        }
    `],
    providers:  [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DropDownComponent implements ControlValueAccessor {
    @Input()  searchEnable: boolean        = false;
    @Input()  items                        = [];
    @Input()  placeholder:  string         = 'Select Item';
    @Input()  multiple:     boolean        = false;
    @Output() change                       = new EventEmitter();

    @ViewChild('input') input: ElementRef;

    private _onChangeCallback:  (value: any) => void = noop;
    private _onTouchedCallback: (value: any) => void = noop;

    selected:   any;
    isVisible:  boolean = false;
    searchText: string;

    constructor(private _eref: ElementRef) {}

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

    selectItem(item) {
        this.selected  = item;
        this._onChangeCallback(item.name);

        this.change.emit(item);

        this.close();
    }

    public get placeholderDisplay(): string {
        if (this.selected) {
            return this.selected.value;
        }

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

    writeValue(value: any): void {
        if (this.items.length > 0) {
            this.items.forEach(item => {
                if (item.name == value) {
                    this.selected = item;
                }
            });
        }
    }

    setDisabledState(isDisabled: boolean): void {}
}
