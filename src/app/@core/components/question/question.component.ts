import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: any;
  @Input() type: any;
  @Input() answers: any;

  form: FormGroup;

  answered = [];

  values = [];

  constructor(private localStorage: LocalStorageService) {
  }

  initializeForm() {
    const savedResponse = this.getLocalStorageQuestion().answer ? this.getLocalStorageQuestion().answer : '';
    let answerControlOption = {};
    if (this.type === 'checkbox') {
      // console.log(savedResponse);
      for (const answer of this.answers) {
        answerControlOption[answer.num] = new FormControl(false);
        for (const item of savedResponse) {
          if (answer.answer === item ) {
            answerControlOption[answer.num] = new FormControl(true);
          }
        }
      }
    } else if (this.type === 'radiobutton' || this.type === 'textbox' || this.type === 'select') {
      // console.log(savedResponse[0]);
      answerControlOption = {
        value: new FormControl(savedResponse[0])
      };
    }
    // else if (this.type === 'select') {
    //   // console.log(savedResponse[0]);
    //   answerControlOption = {
    //     value: new FormControl(savedResponse[0])
    //   };
    // }
    this.form = new FormGroup(answerControlOption);
  }

  initializeLocalStorage() {
    if (!this.localStorage.get('questions')) {
      this.localStorage.set('questions', JSON.stringify({}));
    }
    const localStorageQuestions = JSON.parse(this.localStorage.get('questions'));
    if (!localStorageQuestions[this.question.num]) {
      localStorageQuestions[this.question.num] = {};
    }
    this.localStorage.set('questions', JSON.stringify(localStorageQuestions));
  }

  getLocalStorageQuestion() {
    return JSON.parse(this.localStorage.get('questions'))[this.question.num];
  }

  resumeLocalStorageAnswer() {
    this.values = JSON.parse(this.localStorage.get('questions'))[this.question.num].answer;
  }

  ngOnInit(): void {
    this.initializeLocalStorage();
    this.initializeForm();
    this.resumeLocalStorageAnswer();
  }

  onSubmit(response?: string, n?: number) {
    if (this.type === 'checkbox') {
      if (this.form.value[n]) {
        if (!this.values) {
          this.values = [];
        }
        this.values.push(response);
      } else {
        this.values = this.values.filter((val, i, arr) => {
          if (val !== response) {
            return val;
          }
        });
      }
    } else if (this.type === 'radiobutton' || this.type === 'textbox' || this.type === 'select') {
      this.values = [this.form.value.value];
    }
    console.log('Updated ' + this.question.question + ': ' + this.values);
    const savedQuestion = JSON.parse(this.localStorage.get('questions'));
    if (!savedQuestion[this.question.num]) {
      savedQuestion[this.question.num] = {};
    }
    savedQuestion[this.question.num].question = this.question.question;
    savedQuestion[this.question.num].answer = this.values;
    // console.log(savedQuestion);
    this.localStorage.set('questions', JSON.stringify(savedQuestion));
  }
}
