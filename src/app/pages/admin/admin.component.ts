import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {UserDto} from "../../service/api/entities/UserDto";
import {Router} from "@angular/router";
import {UserRole} from "../../service/api/entities/UserRole";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {AdminSubjectsComponent} from "./admin-subjects/admin-subjects.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  user: UserDto | undefined = undefined;
  userAllowed = false;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getOwnUser();
  }

  getOwnUser() {
    this.apiService.getOwnUser().subscribe({
      next: (user: UserDto) => {
        this.user = user;
        if (this.user.role !== UserRole.ADMIN) {
          this.router.navigate(['home']).then();
        }else {
          this.userAllowed = true;
        }
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['home']).then();
      }
    });
  }
}
