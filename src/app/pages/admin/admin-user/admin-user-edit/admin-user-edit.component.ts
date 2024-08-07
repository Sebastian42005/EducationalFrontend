import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService, baseUrl} from "../../../../service/api/api.service";
import {UserDto} from "../../../../service/api/entities/UserDto";
import {primaryColor} from "../../../../exports/ExportVariables";
import {UserRole} from "../../../../service/api/entities/UserRole";
import {SubjectDto} from "../../../../service/api/entities/SubjectDto";
import {showMessageEmitter} from "../../../../components/popup-info/popup-info.component";
import {StudentDto} from "../../../../service/api/entities/StudentDto";

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrl: './admin-user-edit.component.scss'
})
export class AdminUserEditComponent implements OnInit {
  user: UserDto;
  options = ["Student", "Teacher", "Admin"];
  subjects: SubjectWithActivation[] = [];
  students: UserWithActivation[] = [];
  filteredStudents: UserWithActivation[] = [];
  search = "";

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
        this.getStudents();
      }
    })
  }

  filterStudents() {
    this.filteredStudents = this.students
      .filter(student => this.getStudentName(student).toLowerCase().includes(this.search.toLowerCase()));
  }

  getStudentName(student: UserWithActivation) {
    return student.user.firstName + " " + student.user.lastName;
  }

  getStudents() {
    this.apiService.getAllUsers().subscribe(users => {
      users = users.filter(user => user.role === UserRole.STUDENT);
      users.forEach(currentUser => {
        this.students.push({
          user: currentUser,
          isActivated: this.user.teacher.students.some(student => student.id == currentUser.student.id)
        })
      });
      this.students.sort((a, b) => (a.isActivated === b.isActivated ? 0 : a.isActivated ? -1 : 1));
      this.filteredStudents = this.students;
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

  toggleStudent(student: UserWithActivation) {
    if (student.isActivated) {
      student.isActivated = false
      this.user.teacher.students = this.user.teacher.students.filter(stud => stud.id != student.user.student.id)
    } else {
      student.isActivated = true
      this.user.teacher.students.push(student.user.student)
    }
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

type UserWithActivation = {
  user: UserDto,
  isActivated: boolean
}
