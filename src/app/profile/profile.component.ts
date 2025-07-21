import { Component, OnInit } from '@angular/core';
import { UserDto } from "../service/api/entities/UserDto";
import { ApiService } from "../service/api/api.service";
import { showMessageEmitter } from "../components/popup-info/popup-info.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profilePicture: string = '';
  profilePictureFile: File | null = null;
  editing = false;
  user: UserDto | undefined;
  newPassword: string = '';
  secondPassword: string = '';

  constructor(private readonly apiService: ApiService) {
  }

  ngOnInit() {
    this.getOwnUser();
  }

  private getOwnUser() {
    this.apiService.getOwnUser().subscribe(user => {
      this.user = user;
      this.profilePicture = this.apiService.getUserProfileImage(user.id);
      this.editing = false;
    });
  }

  setProfilePicture(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.profilePictureFile = files[0];
      this.profilePicture = URL.createObjectURL(files[0]);
    }
  }

  saveChanges() {
    /*
    if (this.user) {
      this.apiService.updateUser({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.newPassword
      }).subscribe(() => {
        if (this.profilePictureFile) {
          this.apiService.setUserProfileImage(this.user!.id, this.profilePictureFile).subscribe(() => {
            this.getOwnUser();
            showMessageEmitter.emit({
              message: "Successfully updated user!",
              error: false
            });
          })
        } else {
          this.getOwnUser();
          showMessageEmitter.emit({
            message: "Successfully updated user!",
            error: false
          });
        }
      });
    }*/
  }

  cancelEdit() {
    this.editing = false;
  }

  getButtonDisabled() {
    if (!this.user) {
      return true
    }
    return this.user.firstName === '' || this.user.lastName === '' || this.user.email === '';
  }
}
