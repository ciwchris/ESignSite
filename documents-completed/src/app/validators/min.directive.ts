import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMin]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})
export class MinDirective implements Validator, OnChanges {
    @Input('appMin') min: number;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['min'];
        if (change) {
            this.valFn = minValidator(change.currentValue);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }
}

export function minValidator(min): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const value = control.value;
        console.log(value + ' ' + min);
        return isNaN(min) || isNaN(value) || value < min
            ? {'appMin': {value}}
            : null;
    };
}
