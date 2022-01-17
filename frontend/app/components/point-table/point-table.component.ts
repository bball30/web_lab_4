import {Component, Input, OnInit} from '@angular/core';
import {Point} from "../../models/point";
import {PointService} from "../../services/point.service";

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.css']
})
export class PointTableComponent implements OnInit {
  @Input()
  pointList!: Point[] | undefined;

  constructor(
    private pointService: PointService
  ) { }

  ngOnInit(): void {
    this.updateTable();
    //setInterval(() => {console.log(this.pointList), console.log(this.pointService.points)}, 3000)
    this.pointService.triggerForTable$.subscribe(() => this.updateTable());
  }

  updateTable(): void {
    //console.log("pointService: ", this.pointService.points);
    this.pointList = this.pointService.points;
  }



}
