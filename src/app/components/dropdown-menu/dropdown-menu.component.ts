import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {UserDto} from "../../service/api/entities/UserDto";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() user: UserDto | undefined;
  @Output() logout = new EventEmitter();
  items = [
    {
      text: 'My Profile',
      icon: 'edit',
      action: () => {

      }
    },
    {
      text: 'Logout',
      icon: 'logout',
      action: () => {
        this.logout.emit();
      }
    }
  ];
}
