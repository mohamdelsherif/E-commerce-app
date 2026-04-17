import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fg: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);


  errorMassage = signal<string>("");


  registerForm = this.fg.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    rePassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    phone: [null, [Validators.required, Validators.pattern(/^\d{11}$/)]]
  }, this.checkSamePassword)




  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.errorMassage.set("");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMassage.set(error.error.message);
        }
      });
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
  checkSamePassword(fg: AbstractControl) {
    const password = fg.get('password')?.value;
    const rePassword = fg.get('rePassword')?.value;
    if (password !== rePassword) {
      fg.get('rePassword')?.setErrors({ misMatch: true });
      return { misMatch: true };
    }
    return null;
  }

}
