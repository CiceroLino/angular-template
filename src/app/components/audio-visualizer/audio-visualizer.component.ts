import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'audio-visualizer',
  templateUrl: './audio-visualizer.component.html',
  styleUrls: ['./audio-visualizer.component.scss'],
})
export class AudioVisualizerComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() analyser?: AnalyserNode;
  private animationId: number = 0;

  ngOnInit() {
    this.draw();
  }

  draw = () => {
    if (!this.analyser) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const dataArray = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < dataArray.length; i++) {
      const x = (i / dataArray.length) * canvas.width;
      const y = (dataArray[i] / 255.0) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#00bcd4';
    ctx.lineWidth = 2;
    ctx.stroke();
    this.animationId = requestAnimationFrame(this.draw);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
