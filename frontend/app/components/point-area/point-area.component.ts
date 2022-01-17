import {Component, OnInit} from '@angular/core';
import {PointService} from "../../services/point.service";

@Component({
  selector: 'app-point-area',
  templateUrl: './point-area.component.html',
  styleUrls: ['./point-area.component.css']
})
export class PointAreaComponent implements OnInit {

  constructor(private pointService: PointService) {
  }

  ngOnInit(): void {
    drawCanvas(this.pointService.r);
    drawPoints(this.pointService.points);
    this.pointService.triggerForCanvas$.subscribe(() => this.updateCanvas())
  }

  errors = ""

  checkPoint(event: { offsetX: number; offsetY: number; }) {
    if (this.pointService.r != null && this.pointService.r <= 0) {
      this.errors = "Радиус R должен быть положительным!";
      return;
    } else if (this.pointService.r == null) {
      this.errors = "Выберете R!";
      return;
    } else {
      this.errors = "";
      const x = Math.floor((event.offsetX - 125) / 82 * this.pointService.r * 100) / 100;
      const y = Math.floor((-event.offsetY + 125) / 82 * this.pointService.r * 100) / 100;

      //console.log(x , " ", y)
      this.pointService.postPoint(x, y, this.pointService.r)
    }
  }

  updateCanvas() {
    const canvas: any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawCanvas(this.pointService.r);
    drawPoints(this.pointService.points);
  }
}

  function drawCanvas(r: number | null) {
    const canvas: any = document.getElementById('canvas')
    let labels;
    if (r === null ) {
      labels = ["R", "R/2", "", "-R/2", "-R"]
    } else {
      labels = [r.toString(), (r / 2).toString(), "", (r / 2).toString(), (r).toString()]
    }

    const ctx: any = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    const xAxis = canvasWidth / 2
    const yAxis = canvasHeight / 2
    const xNameAxis = canvasWidth / 6
    const yNameAxis = canvasHeight / 6

    const offsetAxis = 5

    ctx.beginPath()
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "#000"
    ctx.moveTo(xAxis, 0)
    ctx.lineTo(xAxis, canvasHeight)
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasWidth, yAxis)
    ctx.stroke();
    ctx.closePath();

    ctx.font = "15px Arial"
    ctx.fillText("y", xAxis + offsetAxis, offsetAxis * 2)
    ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis)
    ctx.lineTo(xAxis, 0);
    ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
      ctx.moveTo(xAxis - offsetAxis / 2, yNameAxis + yNameAxis * i)
      ctx.lineTo(xAxis + offsetAxis / 2, yNameAxis + yNameAxis * i)
      ctx.stroke()
      ctx.fillText(labels[i], xAxis + offsetAxis, yNameAxis + yNameAxis * i)
    }
    ctx.fillText("x", canvasWidth - offsetAxis * 2, yAxis + 20)
    ctx.moveTo(canvasWidth - offsetAxis, yAxis - offsetAxis / 2);
    ctx.lineTo(canvasWidth, yAxis);
    ctx.moveTo(canvasWidth - offsetAxis, yAxis + offsetAxis / 2);
    ctx.lineTo(canvasWidth, yAxis);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
      ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offsetAxis / 2);
      ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offsetAxis / 2);
      ctx.stroke();
      ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offsetAxis, yAxis + 20);
    }

    ctx.fillStyle = "#6600ff"
    ctx.globalAlpha = 0.4
    ctx.fillRect(xAxis, yAxis, 2 * xNameAxis, 2 * yNameAxis)

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, yAxis + yNameAxis);
    ctx.lineTo(xAxis - xNameAxis, yAxis);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.arc(xAxis, yAxis, xAxis - 2 * xNameAxis, Math.PI , Math.PI * 1.5 );
    ctx.fill();
    ctx.closePath();
  }

  function drawPoints(points: any) {
    //console.log("qqqqq: ", points)
    if (points.length === 0) {
      return;
    }
    const canvas: any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let radius = points[0].r
    for (let i = 0; i < points.length; i++) {
      let r = points[i].r;
      if (r != radius) continue;
      let x = points[i].x;
      let y = points[i].y;
      y = 125 - 82 * y / r;
      x = 125 + 82 * x / r;
      ctx.beginPath();
      ctx.moveTo(x, y);
      let color = "#fd3232";
      if (points[i].hit === true) {
        color = "#00ff0b";
      }
      ctx.fillStyle = color;
      ctx.globalAlpha = 1;
      ctx.arc(x, y, 2.2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
