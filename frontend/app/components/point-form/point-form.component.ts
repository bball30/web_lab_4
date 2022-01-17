import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PointService} from "../../services/point.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.css']
})
export class PointFormComponent implements OnInit {
  readonly xValues = [-3, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3]
  readonly rValues = [-3, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3]

  x = new FormControl(1);
  y = new FormControl('', Validators.compose([
    Validators.min(-3),
    Validators.max(3)
  ]));
  _r = new FormControl(this.pointService.r);


  yError = ""
  rError = ""


  setX(xFromButton: number) {
    this.x.setValue(xFromButton);
  }

  setInputR(rFromButton: number) {
    this._r.setValue(rFromButton);
    this.pointService.r = rFromButton;
  }

  @Output()
  rChange = new EventEmitter<number>();

  @Input()
  set r(value: number) {
    this._r.setValue(value);
    this.rChange.emit(this._r.value);
  }

  setR(newR: any) {
    this._r.setValue(newR.target.value);
    this.pointService.r = this._r.value;
  }

  submit() {
    if(this.validateY()) {
      this.yError = "";
    }
    if(this.validateR()) {
      this.rError = "";
    }
    if (this.validateY() && this.validateR()) {
      this.pointService.postPoint(
        parseFloat(this.x.value),
        parseFloat(this.y.value.replace(',', '.')),
        parseFloat(this._r.value)
      );
    }
  }

  validateY(): boolean {
    if (this.y.value === "") {
      this.yError = "Введите координату Y!";
      return false;
    }
    if (isNaN(parseFloat(this.y.value))) {
      this.yError = "Y должен быть числом!";
      return false;
    }
    if (!(parseFloat(this.y.value) >= -3 && parseFloat(this.y.value) <= 3)) {
      this.yError = "Y должен быть не меньше -3 и не больше 3!";
      return false;
    }
    return true;
  }

  validateR(): boolean {
    if (parseFloat(this._r.value) > 0) {
      return true;
    } else {
      this.rError = "Радиус R должен быть положительным!";
      return false;
    }
  }


  reset() {
    this.x.setValue(1);
    this.y.setValue('');
    this.pointService.getR();
    this._r.setValue(this.pointService.r);
  }

  delete() {
    this.pointService.deletePoints();
    this.pointService.updatePoints();
  }


  constructor(
    private pointService: PointService
  ) {}

  ngOnInit(): void {
    this.pointService.triggerForForm$.subscribe(() => this._r.setValue(null))
  }
}
