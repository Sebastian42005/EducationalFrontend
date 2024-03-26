import {Component, OnInit} from '@angular/core';
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

  constructor(private apiService: ApiService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.loadSubjects();
  }

  getImage(id: number) {
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
