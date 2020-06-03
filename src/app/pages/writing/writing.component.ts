import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../@core/services/backend-api/backend-api.service';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';
import {TimerService} from '../../@core/services/timer/timer.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {
  textForm = new FormGroup({
    textarea: new FormControl('')
  });

  writingText: any;
  maxWord = 300;
  remainingWord: number;


  constructor(private backendApiService: BackendApiService,
              private localStorage: LocalStorageService,
              public timer: TimerService) {
  }

  ngOnInit(): void {
    const wt = this.localStorage.get('writing-text');
    this.writingText = wt ? JSON.parse(wt) : {text: '', locked: false};
    if (this.writingText.text) {
      this.textForm.setValue({textarea: this.writingText.text});
    }
    this.remainingWord = this.maxWord - this.wordCounter();
  }

  onSubmit() {
    if (!this.timer.interval){
      this.timer.startTimer();
    }
    this.remainingWord = this.maxWord -  this.wordCounter();
    this.writingText.text = this.textForm.value.textarea;
    this.localStorage.set('writing-text', JSON.stringify(this.writingText));
  }

  wordCounter() {
    return this.writingText.text.split(/[^\s]+/).length - 1;
  }

  getDisabledValue() {
    console.log(this.timer.time);
    return !(this.timer.time > 0);
  }
}
