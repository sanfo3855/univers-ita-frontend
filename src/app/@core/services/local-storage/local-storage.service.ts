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

  setJSON(key: string, object: Object) {
    localStorage.setItem(key,JSON.stringify(object))
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeQuestionAnswered(num: any) {
    let updatedQuestions = this.getJSON('questions')
    updatedQuestions[num] = {}
    this.set('questions',JSON.stringify(updatedQuestions));
  }
}
