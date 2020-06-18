import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timeDefault = 5;
  time: number;
  stringValue = this.getStringValue();
  interval;

  constructor(private localStorage: LocalStorageService) {
    if (!this.time) {
      this.time = this.timeDefault;
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
    if (this.time < 3600) {
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
