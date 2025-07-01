import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private source?: MediaElementAudioSourceNode;
  private dataArray: Uint8Array;
  private audio = new Audio();

  public isPlaying$ = new BehaviorSubject<boolean>(false);
  public currentTime$ = new BehaviorSubject<number>(0);
  public duration$ = new BehaviorSubject<number>(0);
  public volume$ = new BehaviorSubject<number>(1);

  constructor() {
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime$.next(this.audio.currentTime);
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration$.next(this.audio.duration);
    });
    this.audio.addEventListener('play', () => this.isPlaying$.next(true));
    this.audio.addEventListener('pause', () => this.isPlaying$.next(false));
    this.audio.addEventListener('volumechange', () =>
      this.volume$.next(this.audio.volume)
    );
  }

  loadTrack(url: string) {
    this.audio.src = url;
    this.audio.load();
    if (this.source) this.source.disconnect();
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  setVolume(vol: number) {
    this.audio.volume = vol;
  }
  seek(time: number) {
    this.audio.currentTime = time;
  }

  getAnalyser(): AnalyserNode {
    return this.analyser;
  }
}
