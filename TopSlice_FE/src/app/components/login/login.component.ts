import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
// import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  status = '';
  isLogin = false;
  constructor (private authService: AuthService, private router:Router) {}

  login(){
    if (!this.email || !this.password) {
      this.status = 'Email and password are required';
      return;
    }
    
    this.authService.login(this.email, this.password).subscribe({
      next: (data:any) => {
        this.status = "login successful";
        const token = data.token;
        const jwtElement = token.split('.');
        const payload = JSON.parse(atob(jwtElement[1]));
        const userId = payload.userId;
        console.log('User Login ID:', userId);
        localStorage.setItem('userId', userId);
        this.isLogin = true;
        // this.authService.setUserId(userId);
        this.router.navigate(['/home']);
      },

      error: (err) => {
        if (err.status === 401) {
          this.status = 'Invalid credentials';
        }
        console.error('Error logging in user:', err);
      }
    });
  }

  registerPage() : void {
    this.router.navigate(['/register']);
  }

}
