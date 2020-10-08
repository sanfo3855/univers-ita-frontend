import {
  Component,
  Input,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements /*OnInit,*/ OnChanges {

  @Input() question: any;
  @Input() type: any;
  @Input() answers: any;
  @Input() enabled: any;
  @Input() if_answered: any

  form: FormGroup;

  sub_question_enabled = false;

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
      answerControlOption = {
        value: new FormControl(savedResponse[0])
      };
    }
    this.form = new FormGroup(answerControlOption);

    if (this.enabled) {
        setTimeout(()=>this.form.enable(),1);
    } else {
      setTimeout(()=>{
        this.form.disable();
      },1);
      this.localStorage.removeQuestionAnswered(this.question.num);
    }

    if(this.if_answered != null) {
      if(this.localStorage.isQuestionAnswered(this.question.num)) {
        this.sub_question_enabled = true;
      } else {
        this.sub_question_enabled = false;
      }
    }
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

  ngOnChanges(changes: SimpleChanges): void {
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


    if(this.if_answered != null) {
      if(this.localStorage.isQuestionAnswered(this.question.num)) {
        this.sub_question_enabled = true;
      } else {
        this.sub_question_enabled = false;
      }
    }
  }
}
