import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  // Simulate API submission
  submitRegistration(registration: Registration): Observable<any> {
    console.log('Submitting registration:', registration);
    // Simulate successful API call with delay
    return of({ success: true, message: 'Registration successful!' }).pipe(
      delay(1500) // 1.5 second delay to simulate network
    );
  }
}
