import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api/api.service";
import {WorkshopDto} from "../../../service/api/entities/WorkshopDto";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-workshop-chat',
    templateUrl: './workshop-chat.component.html',
    styleUrls: ['./workshop-chat.component.scss']
})
export class WorkshopChatComponent implements OnInit {
    workshop: WorkshopDto;

    constructor(private apiService: ApiService,
                private activateRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe(param => {
            this.apiService.getWorkshop(param['id']).subscribe(workshop => {
                this.workshop = workshop;
            });
        })
    }
}
