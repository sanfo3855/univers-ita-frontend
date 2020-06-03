import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string){
    return localStorage.getItem(key);
  }

  getJSON(key: string): any {
    if (localStorage.getItem(key) && localStorage.getItem(key) !== '') {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return {};
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
