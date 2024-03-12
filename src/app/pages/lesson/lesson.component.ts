import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonDto} from "../../service/api/entities/LessonDto";
import {ApiService, baseUrl} from "../../service/api/api.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lesson: LessonDto | undefined;
  teacherPDF: SafeResourceUrl | undefined;
  studentPDF: SafeResourceUrl | undefined;
  currentTab = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.apiService.getLessonById(params['id']).subscribe(lesson => {
        this.lesson = lesson;
        this.teacherPDF = getLessonTeacherPDF(lesson.id, this.sanitizer);
        this.studentPDF = getLessonStudentPDF(lesson.id, this.sanitizer);
      });
    });
  }

  goBack() {
    window.history.back();
  }
}

export function getLessonStudentPDF(lessonId: string, sanitizer: DomSanitizer) {
  const url = baseUrl + "/lesson/" + lessonId + "/student-pdf";
  return sanitizer.bypassSecurityTrustResourceUrl(url);
}

export function getLessonTeacherPDF(lessonId: string, sanitizer: DomSanitizer) {
  const url = baseUrl + "/lesson/" + lessonId + "/teacher-pdf";
  return sanitizer.bypassSecurityTrustResourceUrl(url);
}
