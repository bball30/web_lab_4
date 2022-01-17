import {Injectable, OnInit, Output} from '@angular/core';
import {Point} from "../models/point";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointService implements OnInit{
  points: Point[] = [];
  r: number | null = 1;

  getR(): void {
    this.r = this.points[0] != null ? this.points[0].r : null
  }

  private _triggerForTable = new Subject<void>();
  get triggerForTable$() {
    return this._triggerForTable.asObservable();
  }

  private _triggerForCanvas = new Subject<void>();
  get triggerForCanvas$() {
    return this._triggerForCanvas.asObservable();
  }

  private _triggerForForm = new Subject<void>();
  get triggerForForm$() {
    return this._triggerForForm.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    this.updatePoints();
    //setInterval(() => console.log(this.r), 3000)
  }

  ngOnInit(): void {
        this.fetchPoints()
    }

  updatePoints() {
    this.points = [];
    this.fetchPoints();
  }

  fetchPoints() {
    //console.log("Start fetching points...")
    this.points = []
    this.http.get<Point[]>(`${environment.api}/points`)
      .subscribe(
        this.addPoints.bind(this),
        console.error,
        console.log
      );
    //console.log("service points after fetching:\n", this.points)
  }

  postPoint(x: number, y: number, r: number) {
    this.http.post<Point>(`${environment.api}/points`, {x, y, r})
      .subscribe(
        data => {this.addPoint(data)},
        error => {console.log(error)},
        () => {this._triggerForCanvas.next()}
      );
  }

  addPoint(p: Point) {
    p.x = parseFloat(parseFloat(p.x.toString()).toFixed(2));
    p.y = parseFloat(parseFloat(p.y.toString()).toFixed(2));
    p.r = parseFloat(parseFloat(p.r.toString()).toFixed(2));

    this.points.unshift(p);
    this.r = p.r;
  }

  addPoints(ps: Point[]) {
    if (ps) {
      ps.forEach(p => this.addPoint(p));
    }
    this.getR();
    this._triggerForCanvas.next();
  }

  deletePoints() {
    this.http.delete(`${environment.api}/points`)
      .subscribe(
        data => {console.log(data);},
        error => {console.log(error);},
        () => {this.points = [];
          this.r = null;
          this._triggerForForm.next();
          this._triggerForTable.next();
          this._triggerForCanvas.next();
        }
      )
    //this.points = [];
    //console.log("shit: ", this.points)
    //this._trigger.next();
    //console.log(this.points)
  }
}
