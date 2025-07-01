import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() youtubeLink = new EventEmitter<string>();
  youtubeUrl = '';

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type.startsWith('audio/') || file.type.startsWith('video/'))
    ) {
      this.fileSelected.emit(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (
        file &&
        (file.type.startsWith('audio/') || file.type.startsWith('video/'))
      ) {
        this.fileSelected.emit(file);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onYoutubeLoad() {
    if (this.youtubeUrl) {
      this.youtubeLink.emit(this.youtubeUrl);
    }
  }
}
