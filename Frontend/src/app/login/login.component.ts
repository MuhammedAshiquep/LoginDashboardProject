import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add necessary imports for template
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // CHANGED from .css to .scss
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null; // Property 'errorMessage' is declared here

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Method 'onLogin' is declared here
    this.errorMessage = null; // Clear previous errors
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Redirect to dashboard on success
      },
      error: (error) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 429) {
          this.errorMessage =
            'Too many login attempts. Please try again later.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
