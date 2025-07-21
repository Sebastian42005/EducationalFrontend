import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api/api.service';
import { Router } from '@angular/router';
import { showMessageEmitter } from '../../components/popup-info/popup-info.component';
import { primaryColor } from '../../exports/ExportVariables';

@Component({
  selector: 'app-create-class-room',
  templateUrl: './create-class-room.component.html',
  styleUrl: './create-class-room.component.scss',
})
export class CreateClassRoomComponent {
  classroomForm: FormGroup;
  isCreating = false;
  image: File | undefined;
  protected readonly primaryColor = primaryColor;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.classroomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
    });
  }

  createClassroom() {
    if (this.classroomForm.invalid) return;

    this.isCreating = true;
    const { name, description } = this.classroomForm.value;

    this.apiService.createClass(name, description).subscribe((classRoom) => {
      this.apiService.createRoomCode(classRoom.id).subscribe(() => {
        if (this.image) {
          this.apiService.setClassImage(classRoom.id, this.image).subscribe(() => {
            this.isCreating = false;
            this.router.navigate(['classrooms']).then();
            showMessageEmitter.emit({
              message: 'Classroom created successfully',
              error: false,
            });
          })
        } else {
          this.isCreating = false;
          this.router.navigate(['classrooms']).then();
          showMessageEmitter.emit({
            message: 'Classroom created successfully',
            error: false,
          });
        }
      });
    });
  }
}
