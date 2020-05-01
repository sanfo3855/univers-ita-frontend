import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../services/backend-api/backend-api.service';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';

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

  constructor(private backendApiService: BackendApiService,
              private jwtTokenService: JWTTokenService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formValues = this.loginForm.value;
    this.backendApiService.checkLogin(formValues.username, formValues.password).subscribe(data => {
      if (data.success) {
        this.jwtTokenService.setToken(data.token);
        this.router.navigate(['/app-home']);
      } else {

      }
    });
  }

}
