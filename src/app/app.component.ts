import { Component } from '@angular/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'app-root',
  imports: [ RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-forms-workshop';
}
