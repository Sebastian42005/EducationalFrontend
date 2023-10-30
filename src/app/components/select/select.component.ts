import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() placeholder = '';
  @Output() selectedOptionChange = new EventEmitter<string>();
  selectedOption: string = '';
  isOpen = false;

  constructor(private elementRef: ElementRef) {}


  onSelectOption(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
