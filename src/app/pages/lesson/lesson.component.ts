import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonDto} from "../../service/api/entities/LessonDto";
import {ApiService, baseUrl} from "../../service/api/api.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {UserDto} from "../../service/api/entities/UserDto";
import {UserRole} from "../../service/api/entities/UserRole";
import {Location} from "@angular/common";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lesson: LessonDto | undefined;
  user: UserDto;
  fileUrls: { [key: number]: SafeResourceUrl } = {};

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.apiService.getOwnUser().subscribe(user => {
      this.user = user;
    });

    this.activatedRoute.params.subscribe(params => {
      this.apiService.getLessonById(params['id']).subscribe(lesson => {
        this.lesson = lesson;

        this.lesson!.files.forEach(file => {
          this.fileUrls[file.id] = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl + "/files/" + file.id);
        });
      });
    });
  }


  goBack() {
    this.location.back();
  }

  isFileImageType(fileType: string) {
    return fileType.startsWith('image/');
  }

  protected readonly UserRole = UserRole;
}
