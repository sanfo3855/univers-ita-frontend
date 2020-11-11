import { Component, OnInit } from '@angular/core';
import {JWTTokenService} from '../../@core/services/JWT-token/jwt-token.service';
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  constructor(public jwtTokenService: JWTTokenService, private titleService: Title, public localStorage: LocalStorageService) {
    this.titleService.setTitle("Landing page - UniverS-Ita");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Landing Page'})
  }

}
