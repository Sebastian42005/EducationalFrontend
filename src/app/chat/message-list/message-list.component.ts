import {Component, effect, ElementRef, EventEmitter, Input, OnChanges, viewChildren} from '@angular/core';
import {Subscription} from "rxjs";
import {Message, MessageType} from "../../service/api/entities/Message";
import {UserDto} from "../../service/api/entities/UserDto";
import {ApiService} from "../../service/api/api.service";
import {WorkshopDto} from "../../service/api/entities/WorkshopDto";

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.scss'
})
export class MessageListComponent implements OnChanges {
    messageElements = viewChildren<ElementRef<HTMLDivElement>>("body")

    @Input() workshop: WorkshopDto | null;
    ownUser: UserDto;
    currentChat: Subscription;
    messages: Message[] = [];
    message = "";
    newMessageReceived = new EventEmitter<Message>();

    constructor(private apiService: ApiService) {

        /*effect(() => {
            const nativeElementChildren = this.messageElements()
                .map(c => c.nativeElement);
            if (nativeElementChildren) {
                nativeElementChildren[nativeElementChildren.length - 1]?.scrollIntoView()
            }
        });*/
    }

    ngOnChanges() {
        this.currentChat?.unsubscribe();
        this.getCurrentUser();
        this.getOldChat();
        this.getNewMessages();
        this.newMessageReceived.subscribe(message => {
            this.showNotification(message);
        })
    }

    getCurrentUser() {
        this.apiService.getOwnUser().subscribe(user => {
            this.ownUser = user;
        });
    }

    getOldChat() {
        if (this.workshop) {
            this.messages = this.workshop.messages.map(m => {
                m.date = new Date(m.date);
                return m;
            }).sort((a, b) => a.date.getTime() - b.date.getTime());
        }
    }


    getNewMessages() {
        if (this.workshop) {
            this.apiService.joinChat(this.workshop.id);
            this.currentChat = this.apiService.getChat().subscribe(message => {
                if (message.type == MessageType.READ) {
                    this.messages.forEach(m => {
                        if (m.id == message.id) {
                            m.read = true;
                        }
                    });
                } else {
                    message.date = new Date(message.date);
                    this.messages.push(message);
                    this.newMessageReceived.emit(message);
                }
            });
        }
    }


    showNotification(message: Message) {
        Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                new Notification('Du hast eine neue Nachricht', {
                    body: `${message.sender.firstName} ${message.sender.lastName}: ${message.message},`,
                });
            }
        });
    }

    sendMessage() {
        if (this.workshop) {
            this.apiService.sendMessage(this.workshop.id, this.message, this.ownUser)
            this.message = "";
        }
    }

    isOwnMessage(sender: UserDto) {
        if (sender == null) return false;
        return sender.id == this.ownUser.id
    }

    protected readonly MessageType = MessageType;

    isDeclined(message: Message) {
        return message.type == MessageType.WORKSHOP_STATE_CHANGE && message.message.includes("declined");
    }
}
