import {Component, OnInit} from '@angular/core';
import {CreateSubjectDialogComponent} from "../../../dialogs/create-subject-dialog/create-subject-dialog.component";
import {ApiService, baseUrl} from "../../../service/api/api.service";
import {SubjectDto} from "../../../service/api/entities/SubjectDto";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmDialogComponent} from "../../../dialogs/confirm-dialog/confirm-dialog.component";
import {showMessageEmitter} from "../../../components/popup-info/popup-info.component";

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrl: './admin-subjects.component.scss'
})
export class AdminSubjectsComponent implements OnInit {
  subjectList: SubjectDto[] = [];

  constructor(private matDialog: MatDialog,
              private apiService: ApiService,
              private router: Router) {
  }

  openCreateSubjectDialog() {
    this.matDialog.open(CreateSubjectDialogComponent).afterClosed().subscribe(() => {
      this.loadSubjects();
    });
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  getImage(id: number) {
    return baseUrl + '/subject/' + id + '/image';
  }

  showSubject(subject: SubjectDto) {
    this.router.navigate(['admin', 'subject', subject.id]).then();
  }

  deleteSubject(subject: SubjectDto | undefined) {
    if (subject) {
      this.matDialog.open(ConfirmDialogComponent, {
        data: {
          text: "Are you sure you want to delete the subject \"" + subject.name + "\"?",
          cancel: "Cancel",
          confirm: "Delete"
        }
      }).afterClosed().subscribe(isConfirm => {
        if (isConfirm) {
          this.apiService.deleteSubject(subject.id).subscribe(() => {
            this.subjectList = this.subjectList.filter(current => current.id != subject.id);
            showMessageEmitter.emit({
              message: "Successfully deleted subject",
              error: false
            });
          });
        }
      })
    }
  }

  editSubject(subject: SubjectDto) {
    this.router.navigate(['admin', 'subject', subject.id, 'edit']).then();
  }

  private loadSubjects() {
    this.apiService.getAllSubjects().subscribe(subjects => {
      this.subjectList = subjects;
    });
  }
}
