import { Component } from '@angular/core';
import {SubjectDto} from "../../service/api/entities/SubjectDto";
import {ApiService, baseUrl} from "../../service/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-room-list',
  standalone: true,
  imports: [],
  templateUrl: './class-room-list.component.html',
  styleUrl: './class-room-list.component.scss'
})
export class ClassRoomListComponent {
  classRoomList: SubjectDto[] = [];

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
      this.classRoomList = subjects;
    });
  }
}
