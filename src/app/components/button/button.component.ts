import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  @Input() text = "Button";
  @Input() disabled = false;
  @Input() icon = 'star_border';
  @ViewChild('myButton', { static: true }) button: ElementRef<HTMLButtonElement> | undefined;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit(): void {
    if (this.button) {
      const element = this.element.nativeElement as HTMLElement;
      let width = element.offsetWidth;
      if (width === 0) width = 250;
      width -= 32;
      this.element.nativeElement.style.setProperty('--animation-width', `-${width}px`);
    }else {
      this.element.nativeElement.style.setProperty('--animation-width', `-200px`);
    }
  }

}
