import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent, loginEmitter} from "./dialogs/login/login.component";
import {showMessageEmitter} from "./components/popup-info/popup-info.component";
import {Router} from "@angular/router";
import {ApiService} from "./service/api/api.service";
import {UserDto} from "./service/api/entities/UserDto";
import {UserRole} from "./service/api/entities/UserRole";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  showPopup = false;
  isLoggedIn = false;
  user: UserDto | undefined;
  profileImgFailed = false;
  menuOpened = false;
  private globalClickListener: () => void;

  constructor(private matDialog: MatDialog,
              private router: Router,
              private apiService: ApiService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
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

  ngOnDestroy(): void {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  close() {
    this.showPopup = false;
  }

  ngOnInit(): void {
    this.popupSubscribe();
    this.getOwnUser();
    loginEmitter.subscribe(() => this.getOwnUser());
    this.checkProfileClick();
  }

  checkProfileClick() {
    this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInsideProfileImage = this.elementRef.nativeElement.querySelector('app-profile-image')?.contains(event.target);
      const clickedInsideDropdownMenu = this.elementRef.nativeElement.querySelector('app-dropdown-menu')?.contains(event.target);

      if (!clickedInsideProfileImage && !clickedInsideDropdownMenu) {
        this.menuOpened = false;
      }
    });
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
    this.router.navigate(['']).then();
  }

  logout() {
    this.menuOpened = false;
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['']).then();
  }

  protected readonly UserRole = UserRole;
}
