import { Component, OnInit } from '@angular/core';
import {JWTTokenService} from '../../@core/services/JWT-token/jwt-token.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  constructor(public jwtTokenService: JWTTokenService) { }

  ngOnInit(): void {
  }

}
