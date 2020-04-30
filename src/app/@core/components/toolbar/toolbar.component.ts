import {Component, Input, OnInit} from '@angular/core';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() appPath: string[];

  constructor(public jwtTokenService: JWTTokenService) { }



  ngOnInit(): void {

  }

  logOut(): void {
    this.jwtTokenService.resetToken();
  }

}
