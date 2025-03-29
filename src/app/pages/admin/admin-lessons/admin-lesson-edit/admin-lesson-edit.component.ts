import {Component, Inject, OnInit} from '@angular/core';
import {primaryColor} from "../../../../exports/ExportVariables";
import {ApiService, baseUrl} from "../../../../service/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LessonDto} from "../../../../service/api/entities/LessonDto";
import {showMessageEmitter} from "../../../../components/popup-info/popup-info.component";
import {FileDto} from "../../../../service/api/entities/FileDto";

@Component({
  selector: 'app-admin-lesson-edit',
  templateUrl: './admin-lesson-edit.component.html',
  styleUrls: ['./admin-lesson-edit.component.scss']
})
export class AdminLessonEditComponent {
  lesson: LessonDto
  acceptedFileTypes = ".html,.htm,.css,.js,.jpeg,.jpg,.png,.gif,.webp,.svg,.ico,.mp4,.webm,.ogg,.mp3,.wav,.txt,.pdf";
  primaryColor = primaryColor;
  files: File[] = [];
  onlyTeacherList: boolean[] = [];

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) lesson: LessonDto,
              private matDialogRef: MatDialogRef<AdminLessonEditComponent>) {
    this.lesson = {
      ...lesson,
    };
    this.onlyTeacherList.push(...lesson.files.map(file => file.teacherOnly))
    this.addFilesToList(lesson.files)
  }

  addFilesToList(files: FileDto[]) {
    files.forEach(fileDto => {
      const fileUrl = this.apiService.getFile(fileDto.id)
      this.apiService.getFileFromUrl(fileUrl).subscribe(blob => {
        const file = new File([blob], fileDto.name, { type: blob.type });
        this.files.push(file);
      });
    });
  }

  updateLesson() {
    this.apiService.updateLesson(this.lesson).subscribe(lesson => {
      this.apiService.setLessonFiles(lesson.id, this.files, this.onlyTeacherList).subscribe(() => {
        showMessageEmitter.emit({
          message: 'Lesson created successfully',
          error: false
        });
        this.matDialogRef.close();
      });
    });
  }

  addFile(file: File) {
    this.files.push(file);
    this.onlyTeacherList.push(false);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.onlyTeacherList.splice(index, 1);
  }

  isFormValid() {
    return this.files.length > 0 && this.lesson.name.length > 0
  }
}

