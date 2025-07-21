import {Component, Input} from '@angular/core';
import {UserDto} from "../../service/api/entities/UserDto";
import {NgClass, NgStyle, UpperCasePipe} from "@angular/common";
import {ApiService} from "../../service/api/api.service";

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgStyle,
    NgClass
  ],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
  @Input() user: UserDto;
  @Input() darkMode: boolean = true;
  profileImgFailed = false;
  @Input() size: number = 50;

  constructor(private readonly apiService: ApiService) {
  }

  getProfileImage() {
    return this.apiService.getUserProfileImage(this.user.id);
  }

  handleProfileImgError() {
    this.profileImgFailed = true;
  }

}
