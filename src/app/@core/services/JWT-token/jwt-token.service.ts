import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor(private localStorage: LocalStorageService) {
  }

  public setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      this.localStorage.set('jwt-token', token);
      this.localStorage.set('user-type', this.getDecodedToken().type);
    }
  }

  public resetToken() {
    if (this.jwtToken) {
      this.jwtToken = null;
      this.localStorage.remove('jwt-token');
    }
  }

  public getToken(): string | boolean {
    if (this.jwtToken) {
      return this.jwtToken;
    } else {
      if (localStorage.getItem('jwt-token')) {
        this.jwtToken = localStorage.getItem('jwt-token');
        return this.jwtToken;
      } else {
        return false;
      }
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodedToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.username : null;
  }

  getType() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.type : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = Number(this.getExpiryTime());
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 0;
    } else {
      return false;
    }
  }
}
