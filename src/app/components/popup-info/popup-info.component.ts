import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent implements OnInit {
  message: string = "";
  error: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();

  ngOnInit(): void {
    showMessageEmitter.subscribe((messageData: MessageData) => {
      this.message = messageData.message;
      this.error = messageData.error;
    });
  }

  close() {
    this.onClose.emit(true);
  }
}

export const showMessageEmitter = new EventEmitter<MessageData>();

export interface MessageData {
  message: string;
  error: boolean;
}

