import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFirebaseService } from '../services/authFirebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form: FormGroup;
  private errorMessage: string | null = null;

  public getForm(): FormGroup {
    return this.form;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage?.substring(5).replace('-', ' ') ?? null;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private authFirebaseService: AuthFirebaseService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    const rawForm = this.form.getRawValue();
    this.authFirebaseService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.code;
      },
    });
  }

  public guest(): void {
    const rawForm = this.form.getRawValue();
    this.authFirebaseService
      .login('hulyobabaw@email.com', '12345678')
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error.code;
        },
      });
  }

  public cancel(): void {
    this.location.back();
  }
}
