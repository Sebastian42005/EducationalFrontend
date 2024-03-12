import {Component, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "./dialogs/login/login.component";
import {showMessageEmitter} from "./components/popup-info/popup-info.component";
import {Router} from "@angular/router";
import {ApiService} from "./service/api/api.service";
import {UserDto} from "./service/api/entities/UserDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Educational';
  showPopup = false;
  isLoggedIn = false;
  user: UserDto | undefined;
  profileImgFailed = false;
  menuOpened = false;

  constructor(private matDialog: MatDialog,
              private router: Router,
              private apiService: ApiService) {
  }

  login() {
    this.matDialog.open(LoginComponent).afterClosed().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
      }
    });
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  close() {
    this.showPopup = false;
  }

  ngOnInit(): void {
    this.popupSubscribe();
    this.getOwnUser();
    this.headerTitleEmitter();
  }

  getOwnUser() {
    this.apiService.getOwnUser().subscribe({
      next: (user: UserDto) => {
        this.isLoggedIn = true;
        this.user = user;
      },
      error: () => {
        this.isLoggedIn = false;
        localStorage.clear();
      }
    });
  }

  popupSubscribe() {
    showMessageEmitter.subscribe(() => {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 3000)
    });
  }

  navigateToHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['home']).then();
    }else {
      this.router.navigate(['']).then();
    }
  }

  handleProfileImgError() {
    this.profileImgFailed = true;
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['']).then();
  }

  headerTitleEmitter() {
    changeTextEmitter.subscribe(({text, backOption}) => {
      this.title = text;
    })
  }
}

export const changeTextEmitter = new EventEmitter<{text: string, backOption: boolean}>();
