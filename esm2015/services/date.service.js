import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DateService = class DateService {
    constructor() {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    addLeadingZero(value) {
        if (value < 10) {
            return `0${value.toString()}`;
        }
        return value.toString();
    }
    formatMobileYYYYMMDD(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`;
    }
    formatMobileYYYYMMDDTHHMM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${this.formatMobileYYYYMMDD(date)}T${this.addLeadingZero(date.getHours())}:${this.addLeadingZero(date.getMinutes())}`;
    }
    formatMMDDYYYY(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    }
    formatMMDDYYYY_HHMM_AMPM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${this.formatMMDDYYYY(date)} ${this.formatHHMM_AMPM(hours, minutes)}`;
    }
    formatMMDDYYYY_HHMM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${this.formatMMDDYYYY(date)} ${this.formatHHMM(hours, minutes)}`;
    }
    formatHHMM_AMPM(hour, minute, clock) {
        if (hour == null || minute == null) {
            return '';
        }
        if (typeof clock === 'undefined') {
            clock = hour >= 12 ? 'pm' : 'am';
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        else if (hour === 0) {
            hour = 12;
        }
        let formattedMinute = (!minute ? '00' : (minute <= 9 ? `0${minute}` : minute));
        return `${hour}:${formattedMinute} ${clock}`;
    }
    formatHHMM(hour, minute) {
        if (hour == null || minute == null) {
            return '';
        }
        let formattedHour = (!hour ? '00' : (hour <= 9 ? `0${hour}` : hour));
        let formattedMinute = (!minute ? '00' : (minute <= 9 ? `0${minute}` : minute));
        return `${formattedHour}:${formattedMinute}`;
    }
    getCurrentMonthDays(month, year) {
        let dayOfTheMonth = new Date(year, month - 1, 1);
        let nextMonth = new Date(year, month - 1, 1);
        let returnedDays = [];
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        while (dayOfTheMonth.getMonth() != nextMonth.getMonth()) {
            const dayToAdd = {
                day: dayOfTheMonth.getDate(),
                dayOfTheWeek: dayOfTheMonth.getDay(),
                month: dayOfTheMonth.getMonth() + 1,
                date: new Date((dayOfTheMonth.getMonth() + 1) + '/' + dayOfTheMonth.getDate() + '/' + dayOfTheMonth.getFullYear())
            };
            returnedDays.push(dayToAdd);
            dayOfTheMonth.setDate(dayOfTheMonth.getDate() + 1);
        }
        return returnedDays;
    }
    getDateList(Month, Year) {
        return [...this.getPreviousMonthDays(Month, Year),
            ...this.getCurrentMonthDays(Month, Year),
            ...this.getNextMonthDays(Month, Year)];
    }
    getPreviousMonthDays(Month, Year) {
        let day = new Date(Month + '/1/' + Year);
        let returnedDays = [];
        let dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 0) {
            day.setDate(day.getDate() - 1);
            returnedDays = [{
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }, ...returnedDays];
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    }
    getNextMonthDays(Month, Year) {
        let day = new Date(Month + '/1/' + Year);
        day.setMonth(day.getMonth() + 1);
        day.setDate(day.getDate() - 1);
        let returnedDays = [];
        let dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 6) {
            day.setDate(day.getDate() + 1);
            returnedDays = [...returnedDays, {
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }];
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    }
    getMonths() {
        return this.months;
    }
    getMonthText(date) {
        if (date == null) {
            date = new Date();
        }
        return this.months[date.getMonth()];
    }
    getAvailableYears() {
        const currentYear = new Date().getFullYear();
        let startYear = currentYear - 80;
        let returnYears = [];
        while (startYear <= (currentYear + 5)) {
            returnYears.push(startYear);
            startYear = startYear + 1;
        }
        return returnYears;
    }
    canSelectYear(year, min, max) {
        if (!min && !max) {
            return true;
        }
        if (min && year < new Date(min).getFullYear()) {
            return false;
        }
        if (max && year > new Date(max).getFullYear()) {
            return false;
        }
        return true;
    }
    canSelectMonth(month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((min && year === new Date(min).getFullYear())
            || (max && year === new Date(max).getFullYear())) {
            if (min && year === new Date(min).getFullYear() && month < new Date(min).getMonth()) {
                return false;
            }
            if (max && year === new Date(max).getFullYear() && month > new Date(max).getMonth()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectYear(year, min, max);
        }
    }
    canSelectDay(day, month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((min && (year === new Date(min).getFullYear() && month === new Date(min).getMonth()))
            || (max && (year === new Date(max).getFullYear() && month === new Date(max).getMonth()))) {
            if (min && year === new Date(min).getFullYear() && month === new Date(min).getMonth() && day < new Date(min).getDate()) {
                return false;
            }
            if (max && year === new Date(max).getFullYear() && month === new Date(max).getMonth() && day > new Date(max).getDate()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectMonth(month, year, min, max);
        }
    }
};
DateService = tslib_1.__decorate([
    Injectable()
], DateService);
export { DateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxJQUFhLFdBQVcsR0FBeEI7SUFHQztRQUZRLFdBQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFNUgsQ0FBQztJQUVULGNBQWMsQ0FBQyxLQUFhO1FBQ25DLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztTQUM5QjtRQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFVO1FBQzlCLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNuSCxDQUFDO0lBRUQseUJBQXlCLENBQUMsSUFBVTtRQUNuQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNyQyxPQUFPLEVBQUUsQ0FBQztTQUNWO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FB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QUFLLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztlQUNyRixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBRTFGLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2SCxPQUFPLEtBQUssQ0FBQzthQUNiO1lBRUQsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3ZILE9BQU8sS0FBSyxDQUFDO2FBQ2I7WUFFRCxPQUFPLElBQUksQ0FBQztTQUNaO2FBQU07WUFDTixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEQ7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQS9PWSxXQUFXO0lBRHZCLFVBQVUsRUFBRTtHQUNBLFdBQVcsQ0ErT3ZCO1NBL09ZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkYXlPZlRoZU1vbnRoIH0gZnJvbSAnLi4vbW9kZWxzL2RheU9mVGhlTW9udGguaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVTZXJ2aWNlIHtcblx0cHJpdmF0ZSBtb250aHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcblxuXHRjb25zdHJ1Y3RvcigpIHsgfVxuXG5cdHByaXZhdGUgYWRkTGVhZGluZ1plcm8odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG5cdFx0aWYgKHZhbHVlIDwgMTApIHtcblx0XHRcdHJldHVybiBgMCR7dmFsdWUudG9TdHJpbmcoKX1gO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcblx0fVxuXG5cdGZvcm1hdE1vYmlsZVlZWVlNTUREKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuXHRcdGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3RoaXMuYWRkTGVhZGluZ1plcm8oZGF0ZS5nZXRNb250aCgpICsgMSl9LSR7dGhpcy5hZGRMZWFkaW5nWmVybyhkYXRlLmdldERhdGUoKSl9YDtcblx0fVxuXG5cdGZvcm1hdE1vYmlsZVlZWVlNTUREVEhITU0oZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG5cdFx0aWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiBgJHt0aGlzLmZvcm1hdE1vYmlsZVlZWVlNTUREKGRhdGUpfVQke3RoaXMuYWRkTGVhZGluZ1plcm8oZGF0ZS5nZXRIb3VycygpKX06JHt0aGlzLmFkZExlYWRpbmdaZXJvKGRhdGUuZ2V0TWludXRlcygpKX1gO1xuXHR9XG5cblx0Zm9ybWF0TU1ERFlZWVkoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG5cdFx0aWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiBgJHsoZGF0ZS5nZXRNb250aCgpICsgMSl9LyR7ZGF0ZS5nZXREYXRlKCl9LyR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG5cdH1cblxuXG5cdGZvcm1hdE1NRERZWVlZX0hITU1fQU1QTShkYXRlOiBEYXRlKTogc3RyaW5nIHtcblx0XHRpZiAoIWRhdGUgfHwgdHlwZW9mIGRhdGUgPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0Y29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG5cdFx0Y29uc3QgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuXG5cdFx0cmV0dXJuIGAke3RoaXMuZm9ybWF0TU1ERFlZWVkoZGF0ZSl9ICR7dGhpcy5mb3JtYXRISE1NX0FNUE0oaG91cnMsIG1pbnV0ZXMpfWA7XG5cdH1cblxuXHRmb3JtYXRNTUREWVlZWV9ISE1NKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuXHRcdGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcblx0XHRjb25zdCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cblx0XHRyZXR1cm4gYCR7dGhpcy5mb3JtYXRNTUREWVlZWShkYXRlKX0gJHt0aGlzLmZvcm1hdEhITU0oaG91cnMsIG1pbnV0ZXMpfWA7XG5cdH1cblxuXHRmb3JtYXRISE1NX0FNUE0oaG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlciwgY2xvY2s/OnN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKGhvdXIgPT0gbnVsbCB8fCBtaW51dGUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgY2xvY2sgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjbG9jayA9IGhvdXIgPj0gMTIgPyAncG0nIDogJ2FtJztcbiAgICAgICAgfVxuXG5cdFx0aWYgKGhvdXIgPiAxMikge1xuXHRcdCAgICBob3VyID0gaG91ciAtIDEyO1xuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPT09IDApIHtcblx0XHQgICAgaG91ciA9IDEyO1xuICAgICAgICB9XG5cblx0XHRsZXQgZm9ybWF0dGVkTWludXRlID0gKCFtaW51dGUgPyAnMDAnIDogKG1pbnV0ZSA8PSA5ID8gYDAke21pbnV0ZX1gIDogbWludXRlKSk7XG5cblx0XHRyZXR1cm4gYCR7aG91cn06JHtmb3JtYXR0ZWRNaW51dGV9ICR7Y2xvY2t9YDtcblx0fVxuXG5cdGZvcm1hdEhITU0oaG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlcik6IHN0cmluZyB7XG5cdFx0aWYgKGhvdXIgPT0gbnVsbCB8fCBtaW51dGUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRsZXQgZm9ybWF0dGVkSG91ciA9ICghaG91ciA/ICcwMCcgOiAoaG91ciA8PSA5ID8gYDAke2hvdXJ9YCA6IGhvdXIpKTtcblx0XHRsZXQgZm9ybWF0dGVkTWludXRlID0gKCFtaW51dGUgPyAnMDAnIDogKG1pbnV0ZSA8PSA5ID8gYDAke21pbnV0ZX1gIDogbWludXRlKSk7XG5cblx0XHRyZXR1cm4gYCR7Zm9ybWF0dGVkSG91cn06JHtmb3JtYXR0ZWRNaW51dGV9YDtcblx0fVxuXG5cdGdldEN1cnJlbnRNb250aERheXMobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogZGF5T2ZUaGVNb250aFtdIHtcblx0XHRsZXQgZGF5T2ZUaGVNb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSk7XG5cdFx0bGV0IG5leHRNb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSk7XG5cblx0XHRsZXQgcmV0dXJuZWREYXlzOiBkYXlPZlRoZU1vbnRoW10gPSBbXTtcblxuXHRcdG5leHRNb250aC5zZXRNb250aChuZXh0TW9udGguZ2V0TW9udGgoKSArIDEpO1xuXG5cdFx0d2hpbGUgKGRheU9mVGhlTW9udGguZ2V0TW9udGgoKSAhPSBuZXh0TW9udGguZ2V0TW9udGgoKSkge1xuXHRcdFx0Y29uc3QgZGF5VG9BZGQgPSB7XG5cdFx0XHRcdGRheTogZGF5T2ZUaGVNb250aC5nZXREYXRlKCksXG5cdFx0XHRcdGRheU9mVGhlV2VlazogZGF5T2ZUaGVNb250aC5nZXREYXkoKSxcblx0XHRcdFx0bW9udGg6IGRheU9mVGhlTW9udGguZ2V0TW9udGgoKSArIDEsXG5cdFx0XHRcdGRhdGU6IG5ldyBEYXRlKChkYXlPZlRoZU1vbnRoLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRheU9mVGhlTW9udGguZ2V0RGF0ZSgpICsgJy8nICsgZGF5T2ZUaGVNb250aC5nZXRGdWxsWWVhcigpKVxuXG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuZWREYXlzLnB1c2goZGF5VG9BZGQpO1xuXHRcdFx0ZGF5T2ZUaGVNb250aC5zZXREYXRlKGRheU9mVGhlTW9udGguZ2V0RGF0ZSgpICsgMSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXR1cm5lZERheXM7XG5cdH1cblxuXHRnZXREYXRlTGlzdChNb250aDogbnVtYmVyLCBZZWFyOiBudW1iZXIpIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMuZ2V0UHJldmlvdXNNb250aERheXMoTW9udGgsIFllYXIpLFxuXHRcdC4uLnRoaXMuZ2V0Q3VycmVudE1vbnRoRGF5cyhNb250aCwgWWVhciksXG5cdFx0Li4udGhpcy5nZXROZXh0TW9udGhEYXlzKE1vbnRoLCBZZWFyKV07XG5cdH1cblxuXG5cdGdldFByZXZpb3VzTW9udGhEYXlzKE1vbnRoOiBudW1iZXIsIFllYXI6IG51bWJlcik6IGRheU9mVGhlTW9udGhbXSB7XG5cdFx0bGV0IGRheSA9IG5ldyBEYXRlKE1vbnRoICsgJy8xLycgKyBZZWFyKTtcblx0XHRsZXQgcmV0dXJuZWREYXlzOiBkYXlPZlRoZU1vbnRoW10gPSBbXTtcblxuXHRcdGxldCBkYXlPZlRoZVdlZWsgPSBkYXkuZ2V0RGF5KCk7XG5cblx0XHR3aGlsZSAoZGF5T2ZUaGVXZWVrICE9IDApIHtcblx0XHRcdGRheS5zZXREYXRlKGRheS5nZXREYXRlKCkgLSAxKTtcblx0XHRcdHJldHVybmVkRGF5cyA9IFt7XG5cdFx0XHRcdGRheTogZGF5LmdldERhdGUoKSxcblx0XHRcdFx0ZGF5T2ZUaGVXZWVrOiBkYXkuZ2V0RGF5KCksXG5cdFx0XHRcdG1vbnRoOiBkYXkuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHRcdGRhdGU6IG5ldyBEYXRlKChkYXkuZ2V0TW9udGgoKSArIDEpICsgJy8nICsgZGF5LmdldERhdGUoKSArICcvJyArIGRheS5nZXRGdWxsWWVhcigpKVxuXHRcdFx0fSwgLi4ucmV0dXJuZWREYXlzXTtcblx0XHRcdGRheU9mVGhlV2VlayA9IGRheS5nZXREYXkoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0dXJuZWREYXlzO1xuXHR9XG5cblx0Z2V0TmV4dE1vbnRoRGF5cyhNb250aDogbnVtYmVyLCBZZWFyOiBudW1iZXIpOiBkYXlPZlRoZU1vbnRoW10ge1xuXHRcdGxldCBkYXkgPSBuZXcgRGF0ZShNb250aCArICcvMS8nICsgWWVhcik7XG5cdFx0ZGF5LnNldE1vbnRoKGRheS5nZXRNb250aCgpICsgMSk7XG5cdFx0ZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSAtIDEpO1xuXG5cdFx0bGV0IHJldHVybmVkRGF5czogZGF5T2ZUaGVNb250aFtdID0gW107XG5cblx0XHRsZXQgZGF5T2ZUaGVXZWVrID0gZGF5LmdldERheSgpO1xuXG5cdFx0d2hpbGUgKGRheU9mVGhlV2VlayAhPSA2KSB7XG5cdFx0XHRkYXkuc2V0RGF0ZShkYXkuZ2V0RGF0ZSgpICsgMSk7XG5cblx0XHRcdHJldHVybmVkRGF5cyA9IFsuLi5yZXR1cm5lZERheXMsIHtcblx0XHRcdFx0ZGF5OiBkYXkuZ2V0RGF0ZSgpLFxuXHRcdFx0XHRkYXlPZlRoZVdlZWs6IGRheS5nZXREYXkoKSxcblx0XHRcdFx0bW9udGg6IGRheS5nZXRNb250aCgpICsgMSxcblx0XHRcdFx0ZGF0ZTogbmV3IERhdGUoKGRheS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXkuZ2V0RGF0ZSgpICsgJy8nICsgZGF5LmdldEZ1bGxZZWFyKCkpXG5cdFx0XHR9XTtcblx0XHRcdGRheU9mVGhlV2VlayA9IGRheS5nZXREYXkoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0dXJuZWREYXlzO1xuXHR9XG5cblx0Z2V0TW9udGhzKCk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gdGhpcy5tb250aHM7XG5cdH1cblxuXHRnZXRNb250aFRleHQoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG5cdFx0aWYgKGRhdGUgPT0gbnVsbCkge1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLm1vbnRoc1tkYXRlLmdldE1vbnRoKCldO1xuXHR9XG5cblx0Z2V0QXZhaWxhYmxlWWVhcnMoKTogbnVtYmVyW10ge1xuXHRcdGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdGxldCBzdGFydFllYXIgPSBjdXJyZW50WWVhciAtIDgwO1xuXHRcdGxldCByZXR1cm5ZZWFyczogbnVtYmVyW10gPSBbXTtcblxuXHRcdHdoaWxlIChzdGFydFllYXIgPD0gKGN1cnJlbnRZZWFyICsgNSkpIHtcblx0XHRcdHJldHVyblllYXJzLnB1c2goc3RhcnRZZWFyKTtcblx0XHRcdHN0YXJ0WWVhciA9IHN0YXJ0WWVhciArIDE7XG5cdFx0fVxuXHRcdHJldHVybiByZXR1cm5ZZWFycztcblx0fVxuXG5cdGNhblNlbGVjdFllYXIoeWVhcjogbnVtYmVyLCBtaW46IHN0cmluZywgbWF4OiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRpZiAoIW1pbiAmJiAhbWF4KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAobWluICYmIHllYXIgPCBuZXcgRGF0ZShtaW4pLmdldEZ1bGxZZWFyKCkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAobWF4ICYmIHllYXIgPiBuZXcgRGF0ZShtYXgpLmdldEZ1bGxZZWFyKCkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGNhblNlbGVjdE1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlciwgbWluOiBzdHJpbmcsIG1heDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0aWYgKCFtaW4gJiYgIW1heCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKChtaW4gJiYgeWVhciA9PT0gbmV3IERhdGUobWluKS5nZXRGdWxsWWVhcigpKVxuXHRcdFx0fHwgKG1heCAmJiB5ZWFyID09PSBuZXcgRGF0ZShtYXgpLmdldEZ1bGxZZWFyKCkpKSB7XG5cblx0XHRcdGlmIChtaW4gJiYgeWVhciA9PT0gbmV3IERhdGUobWluKS5nZXRGdWxsWWVhcigpICYmIG1vbnRoIDwgbmV3IERhdGUobWluKS5nZXRNb250aCgpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1heCAmJiB5ZWFyID09PSBuZXcgRGF0ZShtYXgpLmdldEZ1bGxZZWFyKCkgJiYgbW9udGggPiBuZXcgRGF0ZShtYXgpLmdldE1vbnRoKCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuY2FuU2VsZWN0WWVhcih5ZWFyLCBtaW4sIG1heCk7XG5cdFx0fVxuXHR9XG5cblx0Y2FuU2VsZWN0RGF5KGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIsIG1pbjogc3RyaW5nLCBtYXg6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGlmICghbWluICYmICFtYXgpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgobWluICYmICh5ZWFyID09PSBuZXcgRGF0ZShtaW4pLmdldEZ1bGxZZWFyKCkgJiYgbW9udGggPT09IG5ldyBEYXRlKG1pbikuZ2V0TW9udGgoKSkpXG5cdFx0XHR8fCAobWF4ICYmICh5ZWFyID09PSBuZXcgRGF0ZShtYXgpLmdldEZ1bGxZZWFyKCkgJiYgbW9udGggPT09IG5ldyBEYXRlKG1heCkuZ2V0TW9udGgoKSkpKSB7XG5cblx0XHRcdGlmIChtaW4gJiYgeWVhciA9PT0gbmV3IERhdGUobWluKS5nZXRGdWxsWWVhcigpICYmIG1vbnRoID09PSBuZXcgRGF0ZShtaW4pLmdldE1vbnRoKCkgJiYgZGF5IDwgbmV3IERhdGUobWluKS5nZXREYXRlKCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWF4ICYmIHllYXIgPT09IG5ldyBEYXRlKG1heCkuZ2V0RnVsbFllYXIoKSAmJiBtb250aCA9PT0gbmV3IERhdGUobWF4KS5nZXRNb250aCgpICYmIGRheSA+IG5ldyBEYXRlKG1heCkuZ2V0RGF0ZSgpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLmNhblNlbGVjdE1vbnRoKG1vbnRoLCB5ZWFyLCBtaW4sIG1heCk7XG5cdFx0fVxuXHR9XG59XG4iXX0=