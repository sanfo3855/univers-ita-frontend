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

  isQuestionAnswered(dependentOn: any) {
    let answered = false;
    if(this.getJSON('questions')[dependentOn].answer) {
      if (this.getJSON('questions')[dependentOn].answer.length !== 0) {
        const answers = this.getJSON('questions')[dependentOn].answer;
        for (let answer of answers) {
          if (answer !== '' || answer != null) {
            answered = true;
          }
        }
      }
    }
    return answered;
  }

  removeQuestionAnswered(num: any) {
    let updatedQuestions = this.getJSON('questions')
    updatedQuestions[num].answer = []
    this.set('questions',JSON.stringify(updatedQuestions));
  }
}
