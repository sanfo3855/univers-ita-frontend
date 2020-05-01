import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JWTTokenService} from '../JWT-token/jwt-token.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedGuard implements CanActivate {
  constructor(private jwtTokenService: JWTTokenService,
              private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtTokenService.getToken()) {
      this.router.navigate(['app-home']);
      return false;
    } else {
      return true;
    }
  }

}
