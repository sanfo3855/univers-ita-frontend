import { Component, OnInit } from '@angular/core';
import {JWTTokenService} from '../../@core/services/JWT-token/jwt-token.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  constructor(public jwtTokenService: JWTTokenService, private titleService: Title) {
    this.titleService.setTitle("Landing page - UniverS-Ita");
  }

  ngOnInit(): void {
  }

}
