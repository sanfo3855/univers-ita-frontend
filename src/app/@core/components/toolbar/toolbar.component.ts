import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {TimerService} from '../../services/timer/timer.service';
import {BackendApiService} from '../../services/backend-api/backend-api.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() appPath: string[];
  @Input() backButton: string[];
  @Input() nextButton: string[];
  @Input() submitButton: string[];

  modalRef: BsModalRef;

  constructor(public jwtTokenService: JWTTokenService,
              public localStorage: LocalStorageService,
              private router: Router,
              private timer: TimerService,
              private backendService: BackendApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {

  }

  isDisabled() {
    if (this.nextButton) {
      if (this.nextButton[0] === '/survey') {
        return !this.isTimeFinished();
      } else if (this.nextButton[0] === '/end') {
        return !this.areQuestionsAnswered();
      } else if (this.nextButton[0] === '/writing') {
        return false;
      }
    } else if (this.submitButton) {
      return !this.areQuestionsAnswered();
    }
  }

  isTimeFinished() {
    if (this.localStorage.get('time')) {
      return this.localStorage.get('time') === '0';
    }
  }

  areQuestionsAnswered() {
    const jsonObj = this.localStorage.getJSON('questions');
    let counterNotAnswered = 0;
    Object.keys(jsonObj).map((key) => {
      if (Object.keys(jsonObj[key]).length !== 0) {
        if (jsonObj[key].answer.length === 0 || jsonObj[key].answer[0] === '') {
          // console.log('answer lunghezza 0');
          counterNotAnswered++;
        }
      } else {
        // console.log('obj lunghezza 0');
        counterNotAnswered++;
      }
    });
    return counterNotAnswered === 0;
  }

  areTextFilled() {
    return this.localStorage.getJSON('text').length !== 0 && this.localStorage.getJSON('text') !== '';
  }

  logOut(): void {
    this.jwtTokenService.resetToken();
    this.localStorage.remove('writing-text');
    this.localStorage.remove('questions');
    this.localStorage.remove('time');
    this.timer.stopTimer();
    this.router.navigate(['/app-home']);
  }

  uploadTextNQuestions(): void {
    const text = this.localStorage.getJSON('writing-text').text;
    const questions = this.localStorage.getJSON('questions');
    this.modalService
    this.backendService.uploadTextNQuestion(text, questions).subscribe((data) => {
        console.log('sent');
    });
  }

}
