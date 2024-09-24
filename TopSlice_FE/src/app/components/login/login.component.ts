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
  constructor (private authService: AuthService, private router:Router) {}

  login(){
    this.authService.login(this.email, this.password).subscribe({
      next: (data:any) => {
        this.status = "login successful";
        console.log(data);
      },
      error: (err) => {
        console.error('Error logging in user:', err);
      }
    });
  }

  registerPage() : void {
    this.router.navigate(['/register']);
  }

}
