import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  email = '';
  password = '';
  emailForLogin = '';
  passwordForLogin = '';

  constructor(private authService: AuthService) {}

  register(){
    this.authService.register(this.email, this.password).subscribe({
      next: (data) => {
        console.log('User registered successfully:');
      },
      error: (err) => {
        console.error('Error registering user:', err);
      }
    });
  }

  login(){
    this.authService.login(this.emailForLogin, this.passwordForLogin).subscribe({
      next: (data) => {
        console.log('User logged in successfully:');
      },
      error: (err) => {
        console.error('Error logging in user:', err);
      }
    });
  }

}
