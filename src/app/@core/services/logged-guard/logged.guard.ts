import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JWTTokenService} from '../JWT-token/jwt-token.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {TimerService} from '../timer/timer.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedGuard implements CanActivate {
  constructor(private jwtTokenService: JWTTokenService,
              private router: Router,
              private localStorage: LocalStorageService,
              private timer: TimerService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.jwtTokenService.getToken();
    this.jwtTokenService.decodeToken();
    if (this.jwtTokenService.isTokenExpired()) {
      this.jwtTokenService.resetToken();
      this.localStorage.remove('writing-text');
      this.localStorage.remove('questions');
      this.localStorage.remove('time');
      this.timer.stopTimer();
      this.router.navigate(['/app-home']);
      return false;
    } else {
      return true;
    }
  }

}
