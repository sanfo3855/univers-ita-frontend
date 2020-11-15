import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {TimerService} from '../../services/timer/timer.service';
import {BackendApiService} from '../../services/backend-api/backend-api.service';

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
  page: string;

  constructor(public jwtTokenService: JWTTokenService,
              public localStorage: LocalStorageService,
              private router: Router,
              private timer: TimerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.url[0].path;

  }

  logOut(): void {
    this.jwtTokenService.resetToken();
    this.localStorage.remove('writing-text');
    this.localStorage.remove('questions');
    this.localStorage.remove('time');
    this.localStorage.remove('imFeelingLucky');
    this.localStorage.remove('sent-to-be');
    this.localStorage.remove('student');
    this.localStorage.remove('user-type');

    this.timer.stopTimer();
    this.router.navigate(['/landing page']);
  }

}
