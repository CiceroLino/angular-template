import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'audio-controls',
  templateUrl: './audio-controls.component.html',
  styleUrls: ['./audio-controls.component.scss'],
})
export class AudioControlsComponent {
  @Input() isPlaying = false;
  @Input() currentTime = 0;
  @Input() duration = 0;
  @Input() volume = 1;
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() seek = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();

  onSeek(event: any) {
    this.seek.emit(event.value);
  }

  onVolumeChange(event: any) {
    this.volumeChange.emit(event.value);
  }
}
