import {Component, OnInit} from '@angular/core';
import {ApiService, baseUrl} from "../../service/api/api.service";
import {Router} from "@angular/router";
import {ClassDto} from "../../service/api/entities/ClassDto";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { ClassRoomDetailComponent } from "../class-room-detail/class-room-detail.component";
import { ClassRoomJoinComponent } from "../class-room-join/class-room-join.component";

@Component({
  selector: 'app-class-room-list',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './class-room-list.component.html',
  styleUrl: './class-room-list.component.scss'
})
export class ClassRoomListComponent implements OnInit {
  classRoomList: ClassDto[] = [];

  constructor(private readonly apiService: ApiService,
              private readonly router: Router) {
  }
  ngOnInit(): void {
    this.loadClassrooms();
  }

  getImage(id: number) {
    return baseUrl + '/class/' + id + '/image';
  }

  showClass(classDto: ClassDto) {
    this.router.navigate(['classrooms', 'detail', classDto.id]).then();
  }

  private loadClassrooms() {
    this.apiService.getClassRooms().subscribe(subjects => {
      this.classRoomList = subjects;
    });
  }
}
