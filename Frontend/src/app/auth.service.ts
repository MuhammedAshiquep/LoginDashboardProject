import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs'; // Import 'of'
import { tap, catchError } from 'rxjs/operators'; // Import 'catchError'
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Auth`;

  // Initialize BehaviorSubject with the current token status from localStorage
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {
    console.log('AuthService: Initializing. Token exists:', this.hasToken());
  }

  // Check if a token exists in local storage
  private hasToken(): boolean {
    const token = localStorage.getItem('jwt_token');
    // Also, optionally check if the token is expired here if you want more robust client-side validation
    // For this project, we'll rely on backend validation for simplicity.
    return !!token;
  }

  // Observable to track login status
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Login method
  login(username: string, password: string): Observable<{ token: string }> {
    console.log('AuthService: Attempting login for user:', username);
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('jwt_token', response.token); // Store token
          this.loggedIn.next(true); // <--- Crucial: Update login status after successful login
          console.log(
            'AuthService: Login successful. Token stored, loggedIn status updated to true.'
          );
        }),
        // Add error handling to ensure BehaviorSubject is not updated on failure
        catchError((error) => {
          console.error('AuthService: Login failed in service:', error);
          this.loggedIn.next(false); // Ensure loggedIn status is false on failure
          localStorage.removeItem('jwt_token'); // Clear any potentially bad token
          throw error; // Re-throw the error so the component can handle it
        })
      );
  }

  // Logout method
  logout(): void {
    console.log(
      'AuthService: Logging out. Removing token, updating loggedIn status to false.'
    );
    localStorage.removeItem('jwt_token'); // Remove token
    this.loggedIn.next(false); // Update login status
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Get the token (used by interceptor, but can be called directly if needed)
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
