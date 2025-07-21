import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService, baseUrl } from "../../service/api/api.service";
import { ClassDto } from "../../service/api/entities/ClassDto";
import { SubjectDto } from "../../service/api/entities/SubjectDto";
import { UserRole } from "../../service/api/entities/UserRole";
import { Clipboard } from "@angular/cdk/clipboard";
import { showMessageEmitter } from "../../components/popup-info/popup-info.component";
import { primaryColor } from "../../exports/ExportVariables";
import { LessonDto } from "../../service/api/entities/LessonDto";
import { UserDto } from "../../service/api/entities/UserDto";

@Component({
  selector: 'app-class-room-detail',
  templateUrl: './class-room-detail.component.html',
  styleUrls: ['./class-room-detail.component.scss']
})
export class ClassRoomDetailComponent implements OnInit {
  classData: ClassDto;
  subjects: SubjectDto[] = [];
  isLoading = true;
  creatingCode = false;
  clickedSubject: SubjectDto | null;
  filteredLessons: LessonDto[] = [];
  user: UserDto | null;
  teacher: UserDto | null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly clipboard: Clipboard,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId) {
      this.apiService.getClassRoom(classId).subscribe((data) => {
        this.classData = data;
        this.isLoading = false;
        this.getSubjects(data.id);
        this.getTeacher(data.id);
      });
    }
    this.getOwnUser();
  }

  getOwnUser() {
    this.apiService.getOwnUser().subscribe(user => {
      this.user = user;
    })
  }

  getSubjects(classId: number) {
    this.apiService.getClassSubjects(classId).subscribe(classEntity => {
      this.subjects = classEntity
    })
  }

  getClassImage() {
    return baseUrl + '/class/' + this.classData.id + '/image';
  }

  createRoomCode() {
    if (!this.classData?.id) return;

    this.creatingCode = true;
    this.apiService.createRoomCode(this.classData.id).subscribe({
      next: (classRoom) => {
        this.classData = classRoom;
        this.creatingCode = false;
      },
      error: (err) => {
        console.error('Error creating room code', err);
        this.creatingCode = false;
      }
    });
  }

  getImage(id: number) {
    return baseUrl + '/subject/' + id + '/image';
  }

  protected readonly UserRole = UserRole;

  copyCodeToClipboard() {
    if (this.isRoomCodeExpired() || !this.classData.roomCode) {
      showMessageEmitter.emit({
        message: "Room code ist abgelaufen oder nicht verfügbar.",
        error: true
      });
      return;
    }

    this.clipboard.copy(this.classData.roomCode.toString());
    showMessageEmitter.emit({
      message: "Room code copied to clipboard!",
      error: false
    });
  }


  protected readonly primaryColor = primaryColor;

  goBack() {
    this.clickedSubject = null;
    this.filteredLessons = [];
  }
  isRoomCodeExpired(): boolean {
    if (!this.classData?.expiresAt) return false;
    return new Date(this.classData.expiresAt) < new Date();
  }

  subjectClick(subject: SubjectDto) {
    this.clickedSubject = subject;
    this.filteredLessons = subject.lessons;
  }

  search(event: string) {
    if (this.clickedSubject?.lessons) {
      if (event) {
        this.filteredLessons = this.clickedSubject?.lessons.filter(lesson => lesson.name.toLowerCase().includes(event.toLowerCase()));
      } else {
        this.filteredLessons = this.clickedSubject?.lessons;
      }
    } else {
      this.filteredLessons = [];
    }
  }

  showLesson(lesson: LessonDto) {
    this.router.navigate(['lesson', lesson.id]).then();
  }

  private getTeacher(id: number) {
    this.apiService.getClassRoomTeacher(id).subscribe(teacher => {
      this.teacher = teacher;
    })
  }
}
