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

  @Input() question_item: any;
  @Input() dependant_sub_questions: any;
  @Input() inline_sub_questions: any;

  @Input() enabled: any;
  @Input() super_responses = [];

  sub_question_enabled = false;

  @Input() changeValueTrigger: any;
  changeValue: any;

  form: FormGroup;


  answered = [];

  responses = [];

  constructor(private localStorage: LocalStorageService) {
  }

  isEnabled() {
    if(this.question_item.super_answers === undefined) {
      return true;
    } else {
      if(this.super_responses) {
        for(let super_answer of this.question_item.super_answers) {
          if(this.super_responses.includes(super_answer)){
            return true;
          }
        }
      } else {
        return false;
      }
    }
    return false;
  }

  initializeForm() {
    const savedResponse = this.responses;
    let answerControlOption = {};
    if (this.question_item.type === 'checkbox') {
      for (const answer of this.question_item.answers) {
        answerControlOption[answer.num] = new FormControl(false);
        for (const item of savedResponse) {
          if (answer.answer === item ) {
            answerControlOption[answer.num] = new FormControl(true);
          }
        }
      }
    } else if (this.question_item.type === 'radiobutton' || this.question_item.type === 'textbox' || this.question_item.type === 'select') {
      answerControlOption = {
        value: new FormControl(savedResponse[0])
      };
    }
    this.form = new FormGroup(answerControlOption);

    if (this.isEnabled()) {
      setTimeout(()=>this.form.enable(),1);
    } else {
      setTimeout(()=>{
        this.form.disable();
      },1);
      this.localStorage.removeQuestionAnswered(this.question_item.question.num);
    }

    if (this.question_item) {
      if (this.question_item.inline_sub_questions) {
        this.inline_sub_questions = this.question_item.inline_sub_questions;
      }
    }
  }

  initializeLocalStorage() {
    if (!this.localStorage.get('questions')) {
      this.localStorage.set('questions', JSON.stringify({}));
    }
    const localStorageQuestions = JSON.parse(this.localStorage.get('questions'));
    if (!localStorageQuestions[this.question_item.question.num]) {
      localStorageQuestions[this.question_item.question.num] = {};
    }
    this.localStorage.set('questions', JSON.stringify(localStorageQuestions));
  }

  getLocalStorageQuestion() {
    return JSON.parse(this.localStorage.get('questions'))[this.question_item.question.num];
  }

  resumeLocalStorageAnswer() {
    let questions = JSON.parse(this.localStorage.get('questions'));
    this.responses = Object.keys(questions[this.question_item.question.num].answer ? questions[this.question_item.question.num].answer : []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeLocalStorage();
    this.resumeLocalStorageAnswer();
    this.initializeForm();
    // this.resumeLocalStorageAnswer();
  }

  onSubmit(response?: string, n?: number) {
    // console.log("Question: " + this.question_item.question + "  - Response: " +response + " - Num: " + n);
    if (this.question_item.type === 'checkbox') {
      if (this.form.value[n]) {
        if (!this.responses) {
          this.responses = [];
        }
        this.responses.push(response);
      } else {
        this.responses = this.responses.filter((val, i, arr) => {
          if (val !== response) {
            return val;
          }
        });
      }
    } else if (this.question_item.type === 'radiobutton' || this.question_item.type === 'textbox' || this.question_item.type === 'select') {
      this.responses = [this.form.value.value];
    }
    console.log('Question ' + this.question_item.question.question + ' - Responses ' + this.responses);

    let savedQuestion = JSON.parse(this.localStorage.get('questions'));
    if (!savedQuestion[this.question_item.question.num]) {
      savedQuestion[this.question_item.question.num] = {};
    }
    savedQuestion[this.question_item.question.num].question = this.question_item.question.question;
    savedQuestion[this.question_item.question.num].answer = {};
    for( let response of this.responses) {
      savedQuestion[this.question_item.question.num].answer[response] = {}
    }
    //savedQuestion[this.question_item.question.num].answer = this.responses;
    console.log(savedQuestion);

    this.localStorage.set('questions', JSON.stringify(savedQuestion));

    this.changeValue = Math.random();
  }
}
