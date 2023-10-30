import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  selectedFile: File | null = null;
  @Input() text: string = "";
  @Input() accept: string = "";
  @Output() fileChange = new EventEmitter<File>();

  pickFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.text = event.target.files[0].name;
      this.fileChange.emit(event.target.files[0]);
    }
  }
}
