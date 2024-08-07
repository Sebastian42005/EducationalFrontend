import {Component, OnInit} from '@angular/core';
import {ApiService, baseUrl} from "../../../../service/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectDto} from "../../../../service/api/entities/SubjectDto";
import {primaryColor} from "../../../../exports/ExportVariables";
import {AppModule} from "../../../../app.module";
import {showMessageEmitter} from "../../../../components/popup-info/popup-info.component";

@Component({
  selector: 'app-admin-subject-edit',
  templateUrl: './admin-subject-edit.component.html',
  styleUrl: './admin-subject-edit.component.scss'
})
export class AdminSubjectEditComponent implements OnInit {
  subject: SubjectDto;
  image = '';
  file: File | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getSubject(params['id']);
    });
  }

  getSubject(id: number) {
    this.apiService.getSubjectById(id).subscribe(subject => {
      this.subject = subject;
      this.getImage(subject.id)
    });
  }

  getImage(id: number) {
    this.image = baseUrl + '/subject/' + id + '/image';
  }

  pickFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file as File);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
  }

  updateSubject() {
    this.apiService.updateSubject(this.subject).subscribe(() => {
      if (this.file) {
        this.apiService.putImageToSubject(this.subject.id, this.file).subscribe(() => {
          this.router.navigate(["admin"]).then()
          showMessageEmitter.emit({
            message: "Successfully updated subject!",
            error: false
          })
        });
      } else {
        this.router.navigate(["admin"]).then()
        showMessageEmitter.emit({
          message: "Successfully updated subject!",
          error: false
        })
      }
    });
  }

  protected readonly primaryColor = primaryColor;
}
