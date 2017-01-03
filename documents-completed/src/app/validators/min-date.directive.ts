import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMinDate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true }]
})

export class MinDateDirective implements Validator, OnChanges {
    @Input('appMinDate') minDate: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['minDate'];
        if (change) {
            this.valFn = minDateValidator(Date.parse(change.currentValue.replace(/\u200E/g, ''))); // IE 0 width char string removal
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

export function minDateValidator(minDate): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlDate = control.value === null || control.value === undefined
            ? null
            : Date.parse(control.value.replace(/\u200E/g, '')); // IE 0 width char string removal

        return isNaN(minDate) || isNaN(controlDate) || controlDate < minDate
            ? { 'appMinDate': { controlDate } }
            : null;
    };
}
