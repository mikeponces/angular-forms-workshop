import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { CustomValidatorsService } from "../validators/custom-validators.service";

@Directive({
    selector: '[appPhoneFormat]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PhoneFormatDirective, multi: true }
    ]
})
export class PhoneFormatDirective implements Validator {
    // @Input('appPhoneFormat') control!: AbstractControl;

    constructor(private customValidators: CustomValidatorsService) { }
    
    validate(control: AbstractControl): ValidationErrors | null {
        return this.customValidators.phoneFormat()(control);
    }
}