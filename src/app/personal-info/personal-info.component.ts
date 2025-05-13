import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomValidatorsService } from '../validators/custom-validators.service';
import { CommonModule } from '@angular/common';
import { CorporateEmailDirective } from '../directives/corporate-email.directive';
import { PhoneFormatDirective } from '../directives/phone-format.directive';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, FormsModule, CorporateEmailDirective, PhoneFormatDirective],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild('personalForm') personalForm!: NgForm;
  @Output() formValidity = new EventEmitter<boolean>();
  @Output() formData = new EventEmitter<any>();

  personalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(public customValidators: CustomValidatorsService) { }

  ngOnInit(): void {
  }

  onValueChanged() {
    if (this.personalForm) {
      this.formValidity.emit(this.personalForm.valid!);
      if (this.personalForm.valid) {
        this.formData.emit(this.personalInfo);
      }
    }
  }
}
