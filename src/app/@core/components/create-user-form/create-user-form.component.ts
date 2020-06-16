import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../services/backend-api/backend-api.service';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
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

  createUserError = '';

  constructor(private backendApiService: BackendApiService,
              private jwtTokenService: JWTTokenService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formValues = this.createUserForm.value;
    if (formValues.username === '' || formValues.password === '' || formValues.type === '') {
      this.createUserError = 'Riempire tutti i campi';
    } else {
      this.backendApiService.createUser(
        formValues.username,
        formValues.password,
        formValues.type
      ).subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin']);
          });
        } else {
          console.log(response.err);
          this.createUserError = response.err;
        }
      });
    }
  }

}
