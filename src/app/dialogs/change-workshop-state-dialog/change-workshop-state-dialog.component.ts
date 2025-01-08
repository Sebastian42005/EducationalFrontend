import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../service/api/api.service";

@Component({
    selector: 'app-change-workshop-state-dialog',
    templateUrl: './change-workshop-state-dialog.component.html',
    styleUrls: ['./change-workshop-state-dialog.component.scss']
})
export class ChangeWorkshopStateDialogComponent {
    message: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public accept: boolean,
        private dialogRef: MatDialogRef<ChangeWorkshopStateDialogComponent>
    ) {
    }

    cancel() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close({
            accept: this.accept,
            stateInfo: this.message
        });
    }
}
