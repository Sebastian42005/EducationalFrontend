import {Component, Inject, Injectable} from '@angular/core';
import {primaryColor} from "../../exports/ExportVariables";
import {ApiService} from "../../service/api/api.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.scss']
})
export class CreateLessonDialogComponent {
  primaryColor = primaryColor;
  name = '';
  studentFile: File | undefined;
  teacherFile: File | undefined;
  subjectId: string | undefined;

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) data: string,
              private matDialogRef: MatDialogRef<CreateLessonDialogComponent>) {
    this.subjectId = data;
  }

  createLesson() {
    if (this.name && this.teacherFile && this.studentFile && this.subjectId) {
      this.apiService.createLesson(this.name, this.subjectId).subscribe(lesson => {
        this.apiService.setLessonPDFs(lesson.id, this.studentFile!, this.teacherFile!).subscribe(() => {
          showMessageEmitter.emit({
            message: 'Lesson created successfully',
            error: false
          });
          this.matDialogRef.close();
        });
      });
    }else {
      showMessageEmitter.emit({
        message: 'Please fill all fields',
        error: true
      });
    }
  }
}
