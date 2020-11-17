import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";
import {BackendApiService} from "../../@core/services/backend-api/backend-api.service";
import {Form, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  loading = false;

  model;

  uploadCouponsForm: FormGroup = new FormGroup({
    list: new FormControl(''),
    expirationDate: new FormControl(''),
    site: new FormControl(''),
    value: new FormControl('')
  });

  showHideCouponForm = false;

  coupons: any;

  statCoupons: any = {
    remaining:null,
    next:null
  };

  constructor(private titleService: Title, private backendService: BackendApiService) {
    this.titleService.setTitle("Monitoraggio - UniverS-ITA");
  }

  ngOnInit(): void {
    this.getStats();
    this.getCoupons();
  }

  showCouponForm(){
    this.showHideCouponForm = !this.showHideCouponForm;
  }

  onSubmit() {
    const couponList = this.uploadCouponsForm.value.list.replace(/(\r\n|\n|\r)/gm,",").split(",");
    const site = this.uploadCouponsForm.value.site;
    const expiration = this.uploadCouponsForm.value.expirationDate
    const value = this.uploadCouponsForm.value.value
    this.sendCoupons(couponList,expiration,site,value);

  }

  sendCoupons(couponList,expiration,site,value) {
    this.backendService.uploadCoupon(couponList,expiration,site,value).subscribe(data => {
      this.getCoupons();
      this.getStats();
      this.uploadCouponsForm.reset();
      this.showHideCouponForm = false;
    })
  }

  update() {
    this.getCoupons();
    this.getStats();
  }

  getCoupons() {
    this.backendService.getCoupons().subscribe(data => {
      this.coupons = data['response'];
    })
  }

  getStats(){
    this.backendService.getCouponStats().subscribe(data => {
      this.statCoupons.remaining = data['response'].remaining;
      this.statCoupons.next = data['response'].counter;
    });
  }
}
