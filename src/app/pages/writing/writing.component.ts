import {Component, HostListener, OnChanges, OnInit} from '@angular/core';
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
  minWord = Number(config['min_word'] ? config['min_word'] : 230);
  maxWord = Number(config['max_word'] ? config['max_word'] : 500);

  remainingWord= Number(config['max_word'] ? config['max_word'] : 500);

  copyPasteError = '';

  isDemo: boolean;

  constructor(private backendApiService: BackendApiService,
              private localStorage: LocalStorageService,
              public timer: TimerService,
              private titleService: Title) {

    this.titleService.setTitle("Scrittura  - UniverS-ITA");

  }

  ngOnInit(): void {
    this.isDemo = this.localStorage.get('student') === 'demo-student';

    this.localStorage.setJSON('last-page',{page:'Scrittura'});
    const wt = this.localStorage.get('writing-text');
    this.writingText = wt ? JSON.parse(wt) : {text: '', locked: false};
    if (this.writingText.text) {
      this.textForm.setValue({textarea: this.writingText.text});
    }
    this.remainingWord = this.maxWord - this.wordCounter();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(this.remainingWord > 0){
      if (!this.timer.interval){
        this.timer.startTimer();
      }
      this.writingText.text = this.textForm.value.textarea;
      this.remainingWord = this.maxWord -  this.wordCounter();
      this.localStorage.set('writing-text', JSON.stringify(this.writingText));
    } else{
      if(event.keyCode !== 32) {
        this.writingText.text = this.textForm.value.textarea;
        this.remainingWord = this.maxWord -  this.wordCounter();
        this.localStorage.set('writing-text', JSON.stringify(this.writingText));
      } else {
        event.preventDefault();
      }

    }
  }

  wordCounter() {
    this.copyPasteError = '';
    return this.writingText.text.length ? this.writingText.text.match(/\S+/g).length : 0;
  }

  lockAction() {
    if(!this.isDemo) {
      this.copyPasteError = 'Azioni di Taglia, Copia ed Incolla non permesse';
      return false;
    }
    return true;
  }
}
