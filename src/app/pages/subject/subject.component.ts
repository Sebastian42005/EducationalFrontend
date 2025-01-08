import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectDto} from "../../service/api/entities/SubjectDto";
import {ApiService} from "../../service/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateLessonDialogComponent} from "../../dialogs/create-lesson-dialog/create-lesson-dialog.component";
import {LessonDto} from "../../service/api/entities/LessonDto";
import {primaryColor} from "../../exports/ExportVariables";
import {UserDto} from "../../service/api/entities/UserDto";
import {UserRole} from "../../service/api/entities/UserRole";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {Location} from "@angular/common";
import {AdminLessonEditComponent} from "../admin/admin-lessons/admin-lesson-edit/admin-lesson-edit.component";

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    subject: SubjectDto | undefined;
    primaryColor = primaryColor;
    filteredLessons: LessonDto[] = [];
    user: UserDto;
    @Input() hasBackArrow = false;
    @Output() onBackArrowClick = new EventEmitter();

    constructor(private activateRoute: ActivatedRoute,
                private apiService: ApiService,
                private matDialog: MatDialog,
                private router: Router,
                private location: Location) {
    }

    ngOnInit(): void {
        this.getUser();
        this.activateRoute.params.subscribe(param => {
            this.loadSubject(param['id']);
        })
    }

    getUser() {
        this.apiService.getOwnUser().subscribe(own => {
            this.user = own;
        })
    }

    loadSubject(id: number) {
        this.apiService.getSubjectById(id).subscribe(subject => {
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
        } else {
            this.filteredLessons = [];
        }
    }

    showLesson(lesson: LessonDto) {
        this.router.navigate(['lesson', lesson.id]).then();
    }

    protected readonly UserRole = UserRole;

    deleteLesson(lesson: LessonDto) {
        this.matDialog.open(ConfirmDialogComponent, {
            data: {
                text: "Are you sure you want to delete the lesson \"" + lesson.name + "\"?",
                cancel: "Cancel",
                confirm: "Yes"
            }
        }).afterClosed().subscribe(isConfirmed => {
            if (isConfirmed) {
                this.apiService.deleteLesson(lesson.id).subscribe(() => {
                    if (this.subject) {
                        this.subject.lessons = this.subject.lessons.filter(current => current.id != lesson.id)
                    }
                    this.filteredLessons = this.filteredLessons.filter(current => current.id != lesson.id)
                    showMessageEmitter.emit({
                        message: "Successfully delete lesson",
                        error: false
                    });
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }

    editLesson(lesson: LessonDto) {
        this.matDialog.open(AdminLessonEditComponent, {
            data: lesson
        }).afterClosed().subscribe(() => {
            this.loadSubject(this.subject!.id);
        })
    }
}
