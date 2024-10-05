// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.gateway; // Your backend URL
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userId: string = '';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
      })
    );
  }

  getToken() {
    return this.tokenSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    localStorage.removeItem('userId');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  setUserId(user_id: string) {
    console.log('setting user id', user_id);
    this.userId = user_id;
  }

  getUserId() {
    console.log('getting user id', this.userId);
    return this.userId;
  }

  // logout(): void {
  //   localStorage.removeItem('userId'); // Clear userId from localStorage
  //   this.router.navigate(['/login']); // Navigate to the login page
  // }
}

