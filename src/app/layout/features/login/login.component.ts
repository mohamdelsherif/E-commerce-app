import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);


  errorMassage = signal<string>('');

  loginForm: FormGroup = this.formBuilder.group({
    'email': [null, [Validators.required, Validators.email]],
    'password': [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          localStorage.setItem('freshToken', response.token);
          localStorage.setItem('freshUser', response.user);
          this.router.navigate(['/home']);
          this.authService.isLoggin.set(true);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMassage.set('Login failed. Please check your credentials and try again.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMassage.set('Please fill in all required fields correctly.');
    }
  }
}
