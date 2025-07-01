import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.fileSelected.emit(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
