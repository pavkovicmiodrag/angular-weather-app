import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  HostListener,
  EventEmitter,
} from '@angular/core';
import {
  COLOR1,
  COLOR2,
  COLOR3,
  COLOR4,
  COLOR5,
  COLOR6,
  COLOR7,
  COLOR8,
  COLOR9,
  COLOR10,
  COLOR11,
  COLOR12,
  COLOR13,
  COLOR14,
  COLOR15,
  COLOR16,
  COLOR17,
  COLOR18,
  COLOR19,
  COLOR20,
  COLOR21,
} from './color-palette';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  @Output()
  color: EventEmitter<string> = new EventEmitter();

  private ctx: CanvasRenderingContext2D | null;
  private mousedown: boolean = false;
  private selectedHeight: number;

  ngAfterViewInit() {
    this.draw();
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, width, height);

      const gradient = this.ctx.createLinearGradient(0, 0, width, 0);

      gradient.addColorStop(0, COLOR1);
      gradient.addColorStop(0.05, COLOR2);
      gradient.addColorStop(0.1, COLOR3);
      gradient.addColorStop(0.15, COLOR4);
      gradient.addColorStop(0.2, COLOR5);
      gradient.addColorStop(0.25, COLOR6);
      gradient.addColorStop(0.3, COLOR7);
      gradient.addColorStop(0.35, COLOR8);
      gradient.addColorStop(0.4, COLOR9);
      gradient.addColorStop(0.45, COLOR10);
      gradient.addColorStop(0.5, COLOR11);
      gradient.addColorStop(0.55, COLOR12);
      gradient.addColorStop(0.6, COLOR13);
      gradient.addColorStop(0.65, COLOR14);
      gradient.addColorStop(0.7, COLOR15);
      gradient.addColorStop(0.75, COLOR16);
      gradient.addColorStop(0.8, COLOR17);
      gradient.addColorStop(0.85, COLOR18);
      gradient.addColorStop(0.9, COLOR19);
      gradient.addColorStop(0.95, COLOR20);
      gradient.addColorStop(1, COLOR21);

      this.ctx.beginPath();
      this.ctx.lineTo(100, 10);
      this.ctx.rect(0, 0, width, height);

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.closePath();

      if (this.selectedHeight) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.ctx.rect(0, this.selectedHeight - 5, width, 10);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      this.emitColor(1, 0.3);
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedHeight = evt.offsetY;
    this.draw();
    this.emitColor(evt.offsetX, evt.offsetY);
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedHeight = evt.offsetY;
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    console.log('rgbaColor', rgbaColor, 'x: ', x, 'y: ', y);

    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx
      ? this.ctx.getImageData(x, y, 1, 1).data
      : [0, 0, 0];
    return (
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    );
  }
}
