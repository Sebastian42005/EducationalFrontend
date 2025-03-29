import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  selectedFile: File | null = null;
  @Input() text: string = "";
  @Input() accept: string = "";
  @Input() file: File;
  @Input() showIcon = true;
  @Input() setOwnFile = true;
  @Output() fileChange = new EventEmitter<File>();

  pickFile(event: any) {
    if (event.target.files.length > 0) {
      if (this.setOwnFile) {
        this.selectedFile = event.target.files[0];
        this.text = event.target.files[0].name;
      }
      this.fileChange.emit(event.target.files[0]);
    }
  }

  ngOnInit() {
    if (this.file) {
      this.selectedFile = this.file;
      this.text = this.file.name;
    }
  }
}
