import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateSubjectDialogComponent} from "../../dialogs/create-subject-dialog/create-subject-dialog.component";
import {SubjectDto} from "../../service/api/entities/SubjectDto";
import {ApiService, baseUrl} from "../../service/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
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

  getImage(id: string) {
    return baseUrl + '/subject/' + id + '/image';
  }

  showSubject(subject: SubjectDto) {
    this.router.navigate(['subject', subject.id]).then();
  }

  private loadSubjects() {
    this.apiService.getAllSubjects().subscribe(subjects => {
      this.subjectList = subjects;
    });
  }
}
