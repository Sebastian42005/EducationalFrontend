import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectDto} from "../../service/api/entities/SubjectDto";
import {ApiService} from "../../service/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateLessonDialogComponent} from "../../dialogs/create-lesson-dialog/create-lesson-dialog.component";
import {LessonDto} from "../../service/api/entities/LessonDto";
import {primaryColor} from "../../exports/ExportVariables";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subject: SubjectDto | undefined;
  primaryColor = primaryColor;
  filteredLessons: LessonDto[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private apiService: ApiService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.loadSubject(param['id']);
    })
  }

  loadSubject(id: string) {
    this.apiService.getSubject(id).subscribe(subject => {
      this.subject = subject;
      this.search('');
    });
  }

  openCreateLessonDialog() {
    this.matDialog.open(CreateLessonDialogComponent, {
      data: this.subject?.id
    }).afterClosed().subscribe(() => {
      this.loadSubject(this.subject!.id);
    })
  }

  search(event: string) {
    if (this.subject?.lessons) {
      if (event) {
        this.filteredLessons = this.subject?.lessons.filter(lesson => lesson.name.toLowerCase().includes(event.toLowerCase()));
      } else {
        this.filteredLessons = this.subject?.lessons;
      }
    }else {
      this.filteredLessons = [];
    }
  }

  showLesson(lesson: LessonDto) {
    this.router.navigate(['lesson', lesson.id]).then();
  }
}
