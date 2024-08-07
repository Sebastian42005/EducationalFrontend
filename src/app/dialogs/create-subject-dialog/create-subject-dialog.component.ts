import {Component} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";
import {primaryColor} from "../../exports/ExportVariables";

@Component({
  selector: 'app-create-subject-dialog',
  templateUrl: './create-subject-dialog.component.html',
  styleUrls: ['./create-subject-dialog.component.scss']
})
export class CreateSubjectDialogComponent {
  name = '';
  description = '';
  primaryColor = primaryColor;
  file: File | undefined;
  free = false;

  constructor(private apiService: ApiService, private matDialogRef: MatDialogRef<CreateSubjectDialogComponent>) {
  }

  createSubject() {
    if (this.file && this.name) {
      this.apiService.createSubject(this.name, this.description, this.free).subscribe(subject => {
        this.apiService.putImageToSubject(subject.id, this.file!).subscribe(() => {
          showMessageEmitter.emit({
            message: 'Subject created successfully',
            error: false
          });
          this.matDialogRef.close();
        });
      });
    }
  }
}
