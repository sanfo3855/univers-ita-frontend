import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-inline-questions',
  templateUrl: './inline-questions.component.html',
  styleUrls: ['./inline-questions.component.scss']
})
export class InlineQuestionsComponent implements OnChanges {

  @Input() inline_sub_question_item: any;
  form: FormGroup;

  @Input() enabling_response: any;
  @Input() super_responses: any;
  @Input() dependentOn: any;

  @Input() inline_sub_questions: any;

  @Input() changeValueTrigger: any;
  changeValue: any;

  answered = [];

  inline_responses = [];

  show = false;

  constructor(private localStorage: LocalStorageService) {
  }

  isEnabled() {
    if(this.inline_sub_question_item.super_answers === undefined) {
      return true;
    } else {
      if(this.super_responses) {
        if(this.enabling_response === undefined) {
          return true;
        } else {
          for (let super_answer of this.inline_sub_question_item.super_answers) {
            if (this.super_responses.includes(super_answer) && super_answer === this.enabling_response) {
              return true;
            }
          }
        }
      } else {
        return false;
      }
    }
    return false;
  }

  initializeForm() {
    let savedResponse = '';
    const questions =  this.localStorage.getJSON('questions');
    let answerControlOption = {};
    if (this.inline_sub_question_item.type === 'checkbox') {
      for (const answer of this.inline_sub_question_item.answers) {
        answerControlOption[answer.num] = new FormControl(false);
        for (const item of savedResponse) {
          if (answer.answer === item) {
            answerControlOption[answer.num] = new FormControl(true);
          }
        }
      }
    } else if (this.inline_sub_question_item.type === 'radiobutton' || this.inline_sub_question_item.type === 'textbox' || this.inline_sub_question_item.type === 'select') {
      answerControlOption = {
        value: new FormControl(savedResponse[0])
      };
    }
    this.form = new FormGroup(answerControlOption);

    if(this.isEnabled()) {
      setTimeout(() => {
        this.form.enable();
        this.show = true;
      }, 1);
    } else {
      setTimeout(() => {
        this.form.disable();
        this.show = false;
      }, 1);
      // this.localStorage.removeQuestionAnswered(this.question.num);
    }
  }

  initializeLocalStorage() {

  }

  getLocalStorageQuestion() {
    return JSON.parse(this.localStorage.get('questions'));
  }

  resumeLocalStorageAnswer() {
    //this.inline_responses = JSON.parse(this.localStorage.get('questions'))[this.dependentOn.num].answer[this.if_super_answer][this.inline_sub_question_item.question.num].answer;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeLocalStorage();
    this.initializeForm();
  }

  onSubmit(response?: string, n?: number) {
    if (this.inline_sub_question_item.type === 'checkbox') {
      if (this.form.value[n]) {
        if (!this.inline_responses) {
          this.inline_responses = [];
        }
        this.inline_responses.push(response);
      } else {
        this.inline_responses = this.inline_responses.filter((val) => {
          if (val !== response) {
            return val;
          }
        });
      }
    } else if (this.inline_sub_question_item.type === 'radiobutton' || this.inline_sub_question_item.type === 'textbox' || this.inline_sub_question_item.type === 'select') {
      this.inline_responses = [this.form.value.value];
    }
    console.log('Question inline: ' + this.inline_sub_question_item.question + ' - Responses inline ' + this.inline_responses);
    const questions =  this.localStorage.getJSON('questions');
    if(this.isEnabled()) {
      if(questions[this.dependentOn]) {

      }
    }
    this.localStorage.set('questions', JSON.stringify(questions));

    this.changeValue = Math.random();
  }

}
