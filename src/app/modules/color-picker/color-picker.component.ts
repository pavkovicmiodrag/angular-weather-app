import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
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
import { Constants } from '../shared/constants.util';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterViewInit {
  HEIGHT: number = Constants.HEIGHT;
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  @Output()
  color: EventEmitter<string> = new EventEmitter();

  @Input()
  width: number;

  private ctx: CanvasRenderingContext2D | null;
  private selectedHeight: number;

  // call the draw method once we are sure, the canvas is already on the screen.
  ngAfterViewInit() {
    this.draw();
  }

  draw() {
    // To draw on the canvas, we first need an object called context.
    // We can get this context by calling the "getContext" method on the canvas-element.
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, width, height);

      // To create this rainbow-like effect for our color-slider, we are going to use a gradient.
      // We want that gradient to fill the whole horizontal canvas so we pass it the width of the canvas.
      const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
      // Afterward, we need to define the locations of the different colors in the gradient.
      // For that we are defining so-called ColorStops.
      // With these colorstops, we devide the gradient into 21 different sub-gradients.
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

      // To fill the whole canvas with this gradient,
      // draw a rectangle of the size of the canvas with the gradient as background-color.
      this.ctx.beginPath();
      this.ctx.lineTo(100, 10);
      this.ctx.rect(0, 0, width, height);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.closePath();
      this.emitColor(1, 0.3);
    }
  }

  // Reading the the color at the selected position and is emitting it using the components color-emitter.
  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  // This method is using the canvas context to read out the color at the given position.
  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx
      ? this.ctx.getImageData(x, y, 1, 1).data
      : [0, 0, 0];
    return (
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    );
  }
}
