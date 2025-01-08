import {Component, Inject, OnInit} from '@angular/core';
import {primaryColor} from "../../../../exports/ExportVariables";
import {ApiService} from "../../../../service/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LessonDto} from "../../../../service/api/entities/LessonDto";

@Component({
    selector: 'app-admin-lesson-edit',
    templateUrl: './admin-lesson-edit.component.html',
    styleUrls: ['./admin-lesson-edit.component.scss']
})
export class AdminLessonEditComponent implements OnInit {
    primaryColor = primaryColor;
    studentFile: File | undefined;
    teacherFile: File | undefined;
    lesson: LessonDto

    constructor(private apiService: ApiService,
                @Inject(MAT_DIALOG_DATA) lesson: LessonDto,
                private matDialogRef: MatDialogRef<AdminLessonEditComponent>) {
        console.log("HURENSOHN: ", lesson)
        this.lesson = lesson;
    }

    ngOnInit(): void {
    }

    updateLesson() {
        this.apiService.updateLesson(this.lesson).subscribe(() => {
            this.apiService.updateLessonPDFs(this.lesson.id, this.studentFile, this.teacherFile).subscribe(() => {
                this.matDialogRef.close();
            });
        });
    }
}
