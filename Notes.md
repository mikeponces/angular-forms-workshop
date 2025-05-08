# Form Validations
## Template-Driven vs. Reactive Forms
- Template: Defined in template using directives
- Reactive: Defined in the component class, more scalable (model-driven)
- Reactive forms use `FormGroup` and `FormControl` for better flexibility

## FormGroup & FormControl
- `FormGroup` groups multiple `FormControl`s together
- `FormControl` represents a single form input field

```ts
this.userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
});
```
```html
<input type='email' formControlName='email' required>
<span *ngIf='userForm.controls.email.invalid'>Invalid email</span>
```
### Custom validation
```ts
static noSpecialCharacters(control: FormControl) {
    const regex = '';
    return regex.test(control.value) 
        ? null 
        : { invalidChar: true };
}
```

### Dynamic Form Controls
- Forms can dynamically add or remove controls
```ts
// Method to add a new skill FormControl
addSkill(): void {
this.skills.push(this.fb.control('', Validators.required));
}
```

### Error Handling
- Angular provides `errors` property to display validation messages
```html
<span *ngIf='userForm.controls.email.errors?.required'>Email is required</span>
```

### Validator
```ts
// password-strength.directive.ts
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [
    { 
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true 
    }
  ]
})
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && value.length >= 8;
    
    return !passwordValid ? { 'passwordStrength': true } : null;
  }
}
```

```html
<div class="form-group">
    <label for="password">Password</label>
    <input 
    type="password" 
    id="password" 
    formControlName="password" 
    class="form-control"
    [ngClass]="{ 'is-invalid': submitted && (f.password.errors || f.password.hasError('passwordStrength')) }"
    appPasswordStrength
    >
    <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
    <div *ngIf="f.password.errors.required">Password is required</div>
    <div *ngIf="f.password.hasError('passwordStrength')">
        Password must be at least 8 characters and include uppercase, lowercase, 
        number and special character
    </div>
    </div>
</div>
```