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
  constructor(private authService: AuthService, private router: Router) {}

  register(){
    this.authService.register(this.email, this.password).subscribe({
      next: (data:any) => {
        console.log(data.message);
        this.status = data.message;
      },
      error: (err) => {
        console.error('Error registering user:', err);
      }
    });
  }

  loginPage() : void {

    this.router.navigate(['/login']);

  }

}
