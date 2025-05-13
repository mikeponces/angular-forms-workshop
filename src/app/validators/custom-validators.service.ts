import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  // Custom validator for minimum years of experience
  minExperience(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value <
        min)) {
        return { 'minExperience': { required: min, actual: control.value } };
      }
      return null;
    };
  }

  // Custom validator for corporate email domains
  corporateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const email = control.value.toLowerCase();
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (personalDomains.includes(domain)) {
        return { 'corporateEmail': { value: control.value } };
      }
      return null;
    };
  }

  // Phone number format validator (simple version)
  phoneFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(control.value)) {
        return { 'phoneFormat': { value: control.value } };
      }
      return null;
    };
  }
}
