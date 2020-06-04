import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../services/backend-api/backend-api.service';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {Router} from '@angular/router';
// import {AdminComponent} from "../../../pages/admin/admin.component";

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  createUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl('')
  });

  constructor(private backendApiService: BackendApiService,
              private jwtTokenService: JWTTokenService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formValues = this.createUserForm.value;
    this.backendApiService.createUser(
      formValues.username,
      formValues.password,
      formValues.type === 'Amministratore' ? 'admin' : 'student'
    ).subscribe( response => {
      console.log(response);
    });
  }

}
