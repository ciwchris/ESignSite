import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMax]',
    providers: [{provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true}]
})
export class MaxDirective implements Validator, OnChanges {
    @Input('appMax') max: number;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['max'];
        if (change) {
            this.valFn = maxValidator(change.currentValue);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }
}

export function maxValidator(max): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const value = control.value;
        return isNaN(max) || isNaN(value) || value > max
            ? {'appMax': {value}}
            : null;
    };
}
