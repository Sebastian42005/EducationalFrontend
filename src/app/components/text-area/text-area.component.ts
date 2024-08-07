import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() onChange = new EventEmitter<string>();
}
