import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  status = '';
  isSuccess = false;
  constructor(private authService: AuthService, private router: Router) {}

  register(){
    if (!this.email || !this.password) {
      this.status = 'Email and password are required';
      this.isSuccess = false;
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: (data:any) => {
        console.log("data after registration",data);
        console.log(data.message);
        this.status = data.message;
        this
      },
      error: (err) => {
        console.error('Error registering user:', err);
        this.status = 'Error registering user';
        this.isSuccess = false;
      }
    });
  }

  loginPage() : void {

    this.router.navigate(['/login']);

  }

}
