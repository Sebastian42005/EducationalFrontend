import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { ApiService } from "../../service/api/api.service";
import { showMessageEmitter } from "../../components/popup-info/popup-info.component";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-class-room-join',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './class-room-join.component.html',
  styleUrl: './class-room-join.component.scss'
})
export class ClassRoomJoinComponent {
  classroomCode = '';

  constructor(private readonly apiService: ApiService,
              private readonly matDialogRef: MatDialogRef<ClassRoomJoinComponent>) {
  }

  joinRoom() {
    this.apiService.joinClass(+this.classroomCode).subscribe({
      next: () => {
        this.classroomCode = '';
        showMessageEmitter.emit({
          message: "Successfully joined classroom!",
          error: false
        })
        this.matDialogRef.close(true);
      },
      error: () => {
        this.classroomCode = '';
        showMessageEmitter.emit({
          message: "Classroom not found!",
          error: true
        })
      }
    });
  }
}
