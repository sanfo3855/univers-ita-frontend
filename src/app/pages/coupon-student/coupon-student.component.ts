import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-coupon-student',
  templateUrl: './coupon-student.component.html',
  styleUrls: ['./coupon-student.component.scss']
})
export class CouponStudentComponent implements OnInit {

  constructor(private localStorage:LocalStorageService) {
    this.responseLucky = this.localStorage.getJSON('imFeelingLucky');
  }

  responseLucky: any

  ngOnInit(): void {

  }

}

