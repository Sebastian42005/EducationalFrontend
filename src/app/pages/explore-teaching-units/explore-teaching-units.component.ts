import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { SubjectDto } from "../../service/api/entities/SubjectDto";
import { ApiService, baseUrl } from "../../service/api/api.service";
import { Router } from "@angular/router";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-explore-teaching-units',
  standalone: true,
  imports: [
    MatButton,
    NgStyle
  ],
  templateUrl: './explore-teaching-units.component.html',
  styleUrl: './explore-teaching-units.component.scss'
})
export class ExploreTeachingUnitsComponent implements OnInit {
  subjectList: SubjectDto[] = [];

  constructor(private readonly apiService: ApiService,
              private readonly router: Router) {
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
