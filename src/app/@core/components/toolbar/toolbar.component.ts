import {Component, Input, OnInit } from '@angular/core';
import {JWTTokenService} from '../../services/JWT-token/jwt-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() appPath: string[];
  @Input() backButton: string[];
  @Input() nextButton: string[];


  constructor(public jwtTokenService: JWTTokenService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  logOut(): void {
    this.jwtTokenService.resetToken();
    this.router.navigate(['/app-home']);
  }

}
