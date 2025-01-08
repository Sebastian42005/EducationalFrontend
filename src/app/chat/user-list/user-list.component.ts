import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {WorkshopDto, WorkshopState} from "../../service/api/entities/WorkshopDto";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
    @Output() showChatEmitter = new EventEmitter<WorkshopDto>();
    workshops: WorkshopDto[] = [];
    filteredWorkshops: WorkshopDto[] = [];
    selectedWorkshop: WorkshopDto | null = null;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getAllWorkshops().subscribe(workshops => {
            this.workshops = workshops;
            this.filteredWorkshops = workshops;
        })
    }

    filter(event: Event) {
        const username = (event.target as HTMLInputElement).value;
        this.filteredWorkshops = this.workshops.filter(workshop => workshop.school.toLowerCase().includes(username.toLowerCase()));
    }

    showChat(workshop: WorkshopDto) {
        this.selectedWorkshop = workshop;
        this.showChatEmitter.emit(workshop);
    }

    getWorkshopIcon(state: WorkshopState) {
        if (state === WorkshopState.ACCEPTED) {
            return 'check';
        } else if (state === WorkshopState.PENDING) {
            return 'hourglass_empty';
        } else {
            return 'cancel';
        }
    }
}
