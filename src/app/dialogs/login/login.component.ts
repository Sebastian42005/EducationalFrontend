import { Component, EventEmitter } from '@angular/core';
import { primaryColor } from "../../exports/ExportVariables";
import { ApiService } from "../../service/api/api.service";
import { MatDialogRef } from "@angular/material/dialog";
import { showMessageEmitter } from "../../components/popup-info/popup-info.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginEmail = '';
  loginPassword = '';
  registerFirstName = '';
  registerLastName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  options = ['Teacher', 'Student'];
  role = '';
  primaryColor = primaryColor;
  currentTabIndex = 0;
  profileImage: File | undefined;
  profileImageUrl: string | undefined;

  constructor(private readonly apiService: ApiService,
              private readonly matDialogRef: MatDialogRef<LoginComponent>,
              private readonly router: Router) {
  }

  getIsLoginDisabled() {
    return this.loginEmail.length < 8 || this.loginPassword.length < 8;
  }

  getIsRegisterDisabled() {
    return this.registerEmail.length < 8 || this.registerPassword.length < 8 || this.registerFirstName.length < 2 || this.registerLastName.length < 2 || this.role === '' || this.registerPassword != this.registerConfirmPassword;
  }

  setRole($event: string) {
    this.role = $event;
  }

  login(email: string, password: string, login: boolean) {
    this.apiService.login(email, password).subscribe(response => {
      localStorage.setItem("token", response.token);
      loginEmitter.emit();
      showMessageEmitter.emit({
        message: login ? 'Login successful!' : 'Register successful!',
        error: false,
      })
      if (response.role === "ROLE_ADMIN") {
        this.router.navigate(['/admin']).then();
      } else if (response.role === "ROLE_TEACHER" || response.role === "ROLE_STUDENT") {
        this.router.navigate(['/dashboard']).then();
      } else {
        this.router.navigate(['/home']).then();
      }
      this.matDialogRef.close(true);
    }, error => {
      showMessageEmitter.emit({
        message: 'Wrong Email or password!',
        error: true,
      })
    });
  }

  register() {
    this.apiService.register(this.registerEmail, this.registerFirstName, this.registerLastName, this.registerPassword, this.role).subscribe(response => {
      if (this.profileImage) {
        this.apiService.setUserProfileImage(response.id, this.profileImage).subscribe(() => {
          this.finishRegister();
        });
      } else {
        this.finishRegister();
      }
    }, error => {
      if (error.status === 409) {
        showMessageEmitter.emit({
          message: 'User already exists!',
          error: true,
        })
      }
    });
  }

  finishRegister() {
    this.login(this.registerEmail, this.registerPassword, false)
  }

  onFileSelected($event: any) {
    if ($event.currentTarget.files.length > 0) {
      this.profileImage = $event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.profileImage!!);
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      }
    }
  }
}

export const loginEmitter = new EventEmitter();
