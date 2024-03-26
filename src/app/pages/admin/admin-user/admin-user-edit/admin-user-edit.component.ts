import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService, baseUrl} from "../../../../service/api/api.service";
import {UserDto} from "../../../../service/api/entities/UserDto";
import {primaryColor} from "../../../../exports/ExportVariables";
import {UserRole} from "../../../../service/api/entities/UserRole";
import {SubjectDto} from "../../../../service/api/entities/SubjectDto";
import {showMessageEmitter} from "../../../../components/popup-info/popup-info.component";

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrl: './admin-user-edit.component.scss'
})
export class AdminUserEditComponent implements OnInit {
  user: UserDto;
  options = ["Student", "Teacher", "Admin"]
  subjects: SubjectWithActivation[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getUser(params['id']);
    });
  }

  getUser(id: number) {
    this.apiService.getUser(id).subscribe(user => {
      this.user = user;
      if (this.user.role === UserRole.TEACHER) {
        this.getSubjects();
      }
    })
  }

  getSubjects() {
    this.apiService.getAllNotFreeSubjects().subscribe(notFreeSubjects => {
      notFreeSubjects.forEach(current => {
        this.subjects.push({
          subject: current,
          isActivated: this.user.teacher.subjects.some(subject => subject.id == current.id)
        })
      });
      this.subjects.sort((a, b) => (a.isActivated === b.isActivated ? 0 : a.isActivated ? -1 : 1));
    })
  }

  getImage(id: number) {
    return baseUrl + '/subject/' + id + '/image';
  }

  protected readonly primaryColor = primaryColor;

  setRole(role: string) {
    switch (role) {
      case "Student": {
        this.user.role = UserRole.STUDENT;
        break;
      }
      case "Teacher": {
        this.user.role = UserRole.TEACHER;
        break;
      }
      case "Admin": {
        this.user.role = UserRole.ADMIN;
        break;
      }
    }
  }

  getUserRoleAsString() {
    return getRoleAsString(this.user.role);
  }

  toggleSubject(subject: SubjectWithActivation) {
    if (subject.isActivated) {
      subject.isActivated = false
      this.user.teacher.subjects = this.user.teacher.subjects.filter(sub => sub.id != subject.subject.id)
    } else {
      subject.isActivated = true
      this.user.teacher.subjects.push(subject.subject)
    }
  }

  updateUser() {
    this.apiService.updateUser(this.user).subscribe(() => {
      this.router.navigate(["admin"]).then()
      showMessageEmitter.emit({
        message: "Successfully updated user!",
        error: false
      })
    })
  }
}

export function getRoleAsString(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Admin";
    case UserRole.STUDENT:
      return "Student";
    case UserRole.TEACHER:
      return "Teacher";
  }
}

type SubjectWithActivation = {
  subject: SubjectDto;
  isActivated: boolean;
};
