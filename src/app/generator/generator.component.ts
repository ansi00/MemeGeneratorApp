import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ColorChromeModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  @ViewChild('memeCanvas', { static: false }) myCanvas: any;
  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000000';
  backgroundColor: string = '#F9F9FB';

  preview(e: any) {
    this.fileEvent = e;

    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = function (event) {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = function () {
        ctx.drawImage(img, 50, 150, 600, 500);
      };
    };
  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.preview(this.fileEvent);
    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, canvas.height - 50);
  }

  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }
  canvasBgColor($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('img/png');
    let link = document.createElement('a');
    link.download = 'memeImg.png';
    link.href = image;
    link.click();
  }
}
