import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
export declare class DateTimePickerComponent implements OnInit, ControlValueAccessor {
    private isMobileService;
    private dateService;
    private eRef;
    pickerVisible: boolean;
    isMobile: boolean;
    invalid: boolean;
    selectedDateTime: Date;
    placeholder: string;
    disableInput: boolean;
    disableButton: boolean;
    disablePicker: boolean;
    doNotCloseOnDateSet: boolean;
    min: string;
    max: string;
    styles: StyleObject;
    use24HourClock: boolean;
    selectedDateTimeChange: EventEmitter<Date>;
    offClick(event: any): void;
    readonly formattedDate: string;
    readonly mobileFormattedDate: string;
    constructor(isMobileService: IsMobileService, dateService: DateService, eRef: ElementRef);
    writeValue(value: Date): void;
    registerOnChange(handler: any): void;
    registerOnTouched(): void;
    setDateTime(dateTime: string): void;
    ngOnInit(): void;
    newDatePicked(date: Date): void;
    setPickerVisible(close: boolean): void;
}