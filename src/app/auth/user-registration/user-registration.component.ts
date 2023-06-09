import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterModel } from 'src/app/models/Registration.Model';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  registerForm: FormGroup | undefined;
  registerModel: RegisterModel = {
    username: '',
    password: '',
    email: '',
    role: 'User',
  };
  constructor(private authService: AuthenticationService) {}

  register() {
    console.log(this.registerModel);

    this.authService.register(this.registerModel).subscribe({
      next: (response: any) => {
        console.log('Registration successful');
        console.log(response);
        // Handle successful registration
      },
      error: (error: any) => {
        console.log('Registration failed');
        console.error(error);
        // Handle registration error
      },
    });
  }
}
