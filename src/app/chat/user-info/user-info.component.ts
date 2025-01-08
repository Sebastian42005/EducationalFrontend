import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {WorkshopDto} from "../../service/api/entities/WorkshopDto";
import {MatDialog} from "@angular/material/dialog";
import {
    ChangeWorkshopStateDialogComponent
} from "../../dialogs/change-workshop-state-dialog/change-workshop-state-dialog.component";
import {showMessageEmitter} from "../../components/popup-info/popup-info.component";
import {UserDto} from "../../service/api/entities/UserDto";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
    @Input() workshop: WorkshopDto | null;
    ownUser: UserDto;
    
    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        this.apiService.getOwnUser().subscribe(user => {
            this.ownUser = user;
        });
    }

    constructor(private apiService: ApiService,
                private matDialog: MatDialog) {
    }

    openChangeWorkshopStateDialog(accepted: boolean) {
        this.matDialog.open(ChangeWorkshopStateDialogComponent, {
            data: accepted
        }).afterClosed().subscribe((result: {accept: boolean, stateInfo: string}) => {
            if (result && this.workshop) {
                this.apiService.changeWorkshopState(this.workshop.id, result.accept).subscribe(() => {
                    this.apiService.sendMessage(this.workshop!.id, result.stateInfo, this.ownUser);
                    showMessageEmitter.emit({
                        message: "Workshop " + (result.accept ? "accepted" : "declined"),
                        error: !result.accept
                    })
                });
            }
        });
    }
}
