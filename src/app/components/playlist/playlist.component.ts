import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Track {
  name: string;
  duration: number;
  url: string;
}

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  @Input() tracks: Track[] = [];
  @Input() currentTrackIndex: number = 0;
  @Output() selectTrack = new EventEmitter<number>();

  onSelect(index: number) {
    this.selectTrack.emit(index);
  }
}
