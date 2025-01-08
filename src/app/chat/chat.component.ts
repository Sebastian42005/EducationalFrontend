import {Component} from '@angular/core';
import {WorkshopDto} from "../service/api/entities/WorkshopDto";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent {
    workshop: WorkshopDto | null;
}
