import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../@core/services/backend-api/backend-api.service';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';
import {TimerService} from '../../@core/services/timer/timer.service';
import {Title} from "@angular/platform-browser";
import * as config from '../../../assets/question-config.json';

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
  maxWord = config['max_word'] ? config['max_word'] : 500;
  remainingWord: number;

  copyPasteError = '';


  constructor(private backendApiService: BackendApiService,
              private localStorage: LocalStorageService,
              public timer: TimerService,
              private titleService: Title) {

    this.titleService.setTitle("Scrittura  - UniverS-ITA");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Scrittura'});
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
    this.copyPasteError = '';
    return this.writingText.text.split(/[^\s]+/).length - 1;
  }

  lockAction() {
    this.copyPasteError = 'Azioni di Taglia, Copia ed Incolla non permesse';
    return false;
  }
}
