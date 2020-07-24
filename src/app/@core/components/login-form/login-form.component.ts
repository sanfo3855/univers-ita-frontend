import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../services/backend-api/backend-api.service';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {TimerService} from '../../services/timer/timer.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginError = '';

  constructor(private backendApiService: BackendApiService,
              private jwtTokenService: JWTTokenService,
              private router: Router,
              private localStorage: LocalStorageService,
              private timer: TimerService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.localStorage.remove('writing-text');
    this.localStorage.remove('questions');
    this.localStorage.remove('time');
    const formValues = this.loginForm.value;
    if (formValues.username !== '' && formValues.password !== '') {
      this.backendApiService.checkLogin(formValues.username, formValues.password).subscribe((data) => {
        if (data.success) {
          this.jwtTokenService.setToken(data.token);
          if (this.jwtTokenService.getDecodedToken().type === 'student') {
            this.router.navigate(['/app-home']);
          } else if (this.jwtTokenService.getDecodedToken().type === 'admin') {
            this.router.navigate(['/admin']);
          }
        } else {
          console.log(data.err);
          this.loginError = data.err;
        }
      });
    } else {
      this.loginError = 'Inserisci entrambe le credenziali';
    }
  }

}
