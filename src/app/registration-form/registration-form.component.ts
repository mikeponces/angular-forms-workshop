import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { Registration } from '../models/registration.model';
import { RegistrationService } from '../services/registration.service';
import { CommonModule } from '@angular/common';
import { ProfessionalInfoComponent } from '../professional-info/professional-info.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  imports: [CommonModule, PersonalInfoComponent, ProfessionalInfoComponent, FormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild(PersonalInfoComponent) personalInfoComponent!: PersonalInfoComponent;

  registrationData: Registration = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    yearsExperience: 0,
    skills: [],
    dietaryRequirements: ''
  };

  personalInfoValid = false;
  professionalInfoValid = false;

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  updatePersonalInfo(formData: any) {
    this.registrationData = { ...this.registrationData, ...formData };
  }

  updatePersonalValidity(valid: boolean) {
    this.personalInfoValid = valid;
  }

  updateProfessionalInfo(formData: any) {
    this.registrationData = { ...this.registrationData, ...formData };
  }

  updateProfessionalValidity(valid: boolean) {
    this.professionalInfoValid = valid;
  }

  canSubmit(): boolean {
    return this.personalInfoValid && this.professionalInfoValid;
  }

  onSubmit() {
    if (!this.canSubmit()) {
      return;
    }
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';
    this.registrationService.submitRegistration(this.registrationData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          console.log('Registration successful', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = 'Registration failed. Please try again.';
          console.error('Registration error', error);
        }
      });
  }
}
