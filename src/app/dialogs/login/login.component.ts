import {Component, EventEmitter} from '@angular/core';
import {primaryColor} from "../../exports/ExportVariables";
import {ApiService} from "../../service/api/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
  options = ['Teacher', 'Student'];
  role = '';
  primaryColor = primaryColor;
  currentTabIndex = 0;

  constructor(private apiService: ApiService,
              private matDialogRef: MatDialogRef<LoginComponent>,
              private router: Router) {
  }

  getIsLoginDisabled() {
    return this.loginEmail.length < 8 || this.loginPassword.length < 8;
  }

  getIsRegisterDisabled() {
    return this.registerEmail.length < 8 || this.registerPassword.length < 8 || this.registerFirstName.length < 2 || this.registerLastName.length < 2 || this.role === '';
  }

  setRole($event: string) {
    this.role = $event;
  }

  login() {
    this.apiService.login(this.loginEmail, this.loginPassword).subscribe(response => {
      localStorage.setItem("token", response.token);
      loginEmitter.emit();
      showMessageEmitter.emit({
        message: 'Login successful!',
        error: false,
      })
      if (response.role === "ROLE_ADMIN") {
        this.router.navigate(['/admin']).then();
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
      showMessageEmitter.emit({
        message: 'Registration successful!',
        error: false,
      });
      this.loginEmail = this.registerEmail;
      this.loginPassword = this.registerPassword;
      this.currentTabIndex = 0;
    });
  }
}

export const loginEmitter = new EventEmitter();
