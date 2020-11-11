import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import * as questionJson from '../../../../assets/question-config.json';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timeDefault = questionJson['time'];
  time: number;
  stringValue = this.getStringValue();
  interval;
  isDemo: boolean;

  constructor(private localStorage: LocalStorageService) {
    this.isDemo = this.localStorage.get('student') === 'demo-student';
    if (!this.time) {
      this.time = this.timeDefault;
    }
    if(this.isDemo) {
      this.time = 60;
    }
    this.loadPreviousTime();
  }

  private getStringValue() {
    return (Math.floor(this.time / 60)) + ':' + ((this.time % 60) >= 10 ? (this.time % 60) : '0' + (this.time % 60));
  }

  private loadPreviousTime() {
    if (this.localStorage.get('time')) {
      this.time = Number(this.localStorage.get('time'));
      this.stringValue = this.getStringValue();
    } else {
      this.localStorage.set('time', this.time.toString());
      this.stringValue = this.getStringValue();
    }
    if (this.time < this.timeDefault) {
      this.startTimer();
    }
  }

  public startTimer() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
        this.localStorage.set('time', this.time.toString());
        this.stringValue = this.getStringValue();
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
    this.time = this.timeDefault;
    this.stringValue = this.getStringValue();
  }

}
