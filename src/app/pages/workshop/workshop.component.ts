import {Component, OnInit} from '@angular/core';
import {primaryColor} from "../../exports/ExportVariables";
import {SubjectDto} from "../../service/api/entities/SubjectDto";
import {ApiService} from "../../service/api/api.service";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent implements OnInit {
  subjects: SubjectDto[] = [];
  options: string[] = [];
  date: Date;
  time: string;
  school: string;
  message: string;
  selectedSubject: SubjectDto | undefined;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getAllSubjectsNoAuth().subscribe({
      next: (subjects: SubjectDto[]) => {
        this.subjects = subjects;
        this.options = subjects.map(subject => subject.name);
      }
    });
  }

  setSubject($event: string) {
    this.selectedSubject = this.subjects.find(subject => subject.name === $event);
  }

  protected readonly primaryColor = primaryColor;

  bookWorkshop() {
    const instant = new Date(this.date);
    const time = this.time.split(':');
    instant.setHours(parseInt(time[0]));
    instant.setMinutes(parseInt(time[1]));

    if (this.selectedSubject) {
      this.apiService.bookWorkshop(this.selectedSubject, instant.toISOString(), this.school, this.message).subscribe({
        next: () => {
          alert('Workshop booked successfully');
        },
        error: () => {
          alert('Failed to book workshop');
        }
      });
    }
  }
}
