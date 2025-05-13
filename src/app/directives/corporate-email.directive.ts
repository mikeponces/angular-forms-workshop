import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { CustomValidatorsService } from "../validators/custom-validators.service";

@Directive({
    selector: '[appCorporateEmail]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: CorporateEmailDirective, multi: true }
    ]
})
export class CorporateEmailDirective implements Validator {
    // @Input('appCorporateEmail') control!: AbstractControl;

    constructor(private customValidators: CustomValidatorsService) { }
    
    validate(control: AbstractControl): ValidationErrors | null {
        return this.customValidators.corporateEmail()(control);
    }
}