import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/Login.Model';
import { FormBuilder } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm: FormGroup = new FormGroup({});
  loginSuccess?: boolean = true;
  loginModel: LoginModel = {
    username: '',
    password: '',
    //email: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Create loginForm in a similar way
  }

  // register() {
  //   this.registerModel = this.registerForm.value;
  //   this.authService.register(this.registerModel).subscribe(
  //     (response: any) => {
  //       console.log('Registration successful');
  //       console.log(response);
  //       // Handle successful registration
  //     },
  //     (error: any) => {
  //       console.log('Registration failed');
  //       console.error(error);
  //       // Handle registration error
  //     }
  //   );
  // }

  login() {
    console.log('called');

    this.loginModel = this.loginForm!.value;
    console.log(this.loginModel);

    this.authService.login(this.loginModel).subscribe(
      () => {
        console.log('Login successful');
        this.router.navigate(['']); // Navigate to the AppComponent
        this.loginSuccess = true;
        // Handle successful login, redirect, etc.
      },
      (error: any) => {
        console.log('Login failed');
        console.error(error);
        this.loginSuccess = false;
        // Handle login error
      }
    );
  }
}
