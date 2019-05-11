import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordConfirmValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 

  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlterneteEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validators: passwordConfirmValidator });

    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Jan',
      password: 'test',
      confirmPassword: 'test',
      //address: {
      //  city: 'City',
      //  state: 'State',
      //  postalCode: '123456'
      //}
    });
  }

  onSubmit() {

    console.log(this.registrationForm.value);

    this._registrationService.register(this.registrationForm.value)
      .subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
      );
    
  }
}
