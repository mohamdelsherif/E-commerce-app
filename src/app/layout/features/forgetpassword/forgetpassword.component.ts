import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);



  step = signal<number>(1);

  emailForm = this.formBuilder.group({
    'email': [null, [Validators.required, Validators.email]],
  });
  codeForm = this.formBuilder.group({
    'resetCode': [null, [Validators.required]],
  });
  passwordForm = this.formBuilder.group({
    'email': [null, [Validators.required, Validators.email]],
    'newPassword': [null, [Validators.required]],
  });

  sendEmail() {
    if (this.emailForm.valid) {
      this.authService.sendEmail(this.emailForm.value).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          this.step.set(2);
        }
      });
    }
  }

  verifyCode() {
    if (this.codeForm.valid) {
      this.authService.sendCode(this.codeForm.value).subscribe({
        next: (response) => {
          console.log('Code verified successfully:', response);
          this.step.set(3);
        }
      });
    }
  }

  resetPassword() {
    if (this.passwordForm.valid) {
      this.authService.resetPassword(this.passwordForm.value).subscribe({
        next: (response) => {
          console.log('Password reset successfully:', response);
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
