import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorsService } from '../validators/custom-validators.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professional-info.component.html',
  styleUrl: './professional-info.component.css'
})
export class ProfessionalInfoComponent implements OnInit {
  @Output() formValidity = new EventEmitter<boolean>();
  @Output() formData = new EventEmitter<any>();

  professionalForm!: FormGroup;

  dietaryOptions = [
    'None',
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Kosher',
    'Halal'
  ];

  constructor(
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.professionalForm.statusChanges.subscribe(status => {
      this.formValidity.emit(status === 'VALID');
      if (status === 'VALID') {
        this.formData.emit(this.professionalForm.value);
      }
    });
  }
  createForm() {
    this.professionalForm = this.fb.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      jobTitle: ['', [Validators.required]],
      yearsExperience: [0, [
        Validators.required,
        Validators.min(0),
        this.customValidators.minExperience(1)
      ]],
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      dietaryRequirements: ['None']
    });
  }

  get skills() {
    return this.professionalForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }
}
