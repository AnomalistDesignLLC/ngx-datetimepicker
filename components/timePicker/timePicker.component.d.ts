import { EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
export declare class TimePickerComponent implements ControlValueAccessor {
    private isMobileService;
    private dateService;
    private eRef;
    selectedTime: string;
    placeholder: string;
    disableInput: boolean;
    disableButton: boolean;
    disablePicker: boolean;
    doNotCloseOnDateSet: boolean;
    styles: StyleObject;
    use24HourClock: boolean;
    selectedTimeChange: EventEmitter<string>;
    offClick(event: any): void;
    pickerVisible: boolean;
    isMobile: boolean;
    readonly formattedTime: string;
    mobileFormattedTime: string;
    selectedHour: number;
    selectedMinute: number;
    constructor(isMobileService: IsMobileService, dateService: DateService, eRef: ElementRef);
    writeValue(value: string): void;
    registerOnChange(handler: any): void;
    registerOnTouched(): void;
    setMobileFormattedTime(time: string): void;
    setFormattedTime(formattedTime: string): void;
    setHourNow(hour: any): void;
    setMinuteNow(minute: any): void;
    setPickerVisible(close: boolean): void;
}