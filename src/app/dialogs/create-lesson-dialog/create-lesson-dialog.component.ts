import {Component, Inject} from '@angular/core';
import {primaryColor} from "../../exports/ExportVariables";
import {ApiService} from "../../service/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.scss']
})
export class CreateLessonDialogComponent {
  acceptedFileTypes = ".html,.htm,.css,.js,.jpeg,.jpg,.png,.gif,.webp,.svg,.ico,.mp4,.webm,.ogg,.mp3,.wav,.txt,.pdf";
  primaryColor = primaryColor;
  name = '';
  description = '';
  files: File[] = [];
  onlyTeacherList: boolean[] = [];
  subjectId: number | undefined;

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) data: number,
              private matDialogRef: MatDialogRef<CreateLessonDialogComponent>) {
    this.subjectId = data;
  }

  createLesson() {
    if (this.subjectId && this.files.length > 0) {
      this.apiService.createLesson(this.name, this.description, this.subjectId).subscribe(lesson => {
        this.apiService.setLessonFiles(lesson.id, this.files, this.onlyTeacherList).subscribe(() => {
          showMessageEmitter.emit({
            message: 'Lesson created successfully',
            error: false
          });
          this.matDialogRef.close();
        });
      });
    }
  }

  addFile(file: File) {
    this.files.push(file);
    this.onlyTeacherList.push(false);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.onlyTeacherList.splice(index, 1);
  }
}
