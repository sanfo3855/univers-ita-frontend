import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {TimerService} from '../../services/timer/timer.service';

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

  constructor(public jwtTokenService: JWTTokenService,
              public localStorage: LocalStorageService,
              private router: Router,
              private timer: TimerService) {
  }

  ngOnInit(): void {

  }

  isDisabled() {
    if (this.nextButton[0] === '/survey') {
      return this.isTimeFinished();
    } else if (this.nextButton[0] === '/end') {
      return this.areQuestionsAnswered();
    }
  }

  isTimeFinished() {
    return this.localStorage.get('time') ? (this.localStorage.get('time') === '0') : true;
  }

  areQuestionsAnswered() {

    return this.localStorage.getJSON('questions').map((key, value) => {

    });
  }

  logOut(): void {
    this.jwtTokenService.resetToken();
    this.localStorage.remove('writing-text');
    this.localStorage.remove('questions');
    this.localStorage.remove('time');
    this.timer.stopTimer();
    this.router.navigate(['/app-home']);
  }

}
