import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {primaryColor} from "../../exports/ExportVariables";

export let optionsHeight = 0;
@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss'],
  animations: [
    trigger('changeHeightAnimation', [
      state('close', style({
        height: '0',
      })),
      state('open', style({
        height: '*'
      })),
      transition('open => close', [
        animate('150ms')
      ]),
      transition('close => open', [
        animate('150ms')
      ]),
    ])
  ]
})
export class Select2Component implements AfterViewInit {
  @Input() options: string[] = [];
  @Input() placeholder = '';
  @Output() selectedOptionChange = new EventEmitter<string>();
  @Input() color = 'black';
  selectedOption: string = '';
  canAnimate = false;
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.setProperty('--color', this.color);
  }

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
