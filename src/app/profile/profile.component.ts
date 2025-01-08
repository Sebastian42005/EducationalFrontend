import {Component} from '@angular/core';
import {UserDto} from "../service/api/entities/UserDto";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        MatIcon
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    profilePicture: string = '';
    profilePictureFile: File | null = null;
    editing = false;

    setProfilePicture(event: any) {
        const files = event.target.files;
        if (files.length > 0) {
            this.profilePictureFile = files[0];
            this.profilePicture = URL.createObjectURL(files[0]);
        }
    }
}
