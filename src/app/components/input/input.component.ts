import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() isSearch: boolean = false;
  @Output() textChange = new EventEmitter<string>();
  @Input() color: string = 'black';
  @Input() showInfo: boolean = false;
  passwordVisible: boolean = false;

  onInputChange() {
    this.textChange.emit(this.value);
  }

  getType() {
    if (this.type !== 'password') {
      return this.type;
    }
    return this.passwordVisible ? 'text' : 'password';
  }

  changePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
