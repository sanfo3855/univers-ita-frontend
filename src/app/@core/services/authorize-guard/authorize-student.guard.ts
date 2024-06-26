import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {JWTTokenService} from '../JWT-token/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeStudentGuard implements CanActivate {
  constructor(private authStorage: LocalStorageService,
              private jwtService: JWTTokenService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtService.getToken() && this.jwtService.getType() === 'student') {
      if (this.jwtService.isTokenExpired()) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/landing page']);
      return false;
    }
  }

}
