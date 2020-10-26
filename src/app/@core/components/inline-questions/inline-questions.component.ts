import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
        for(let super_answer of this.inline_sub_question_item.super_answers) {
          if(this.super_responses.includes(super_answer) && super_answer === this.enabling_response){
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
    let savedResponse = '';
    // if(this.getLocalStorageQuestion()[this.dependentOn]) {
    //   if(this.getLocalStorageQuestion()[this.dependentOn].answer) {
    //     if (this.getLocalStorageQuestion()[this.dependentOn].answer[this.super_answer]) {
    //       if (this.getLocalStorageQuestion()[this.dependentOn].answer[this.super_answer][this.question.num]) {
    //         savedResponse = this.getLocalStorageQuestion()[this.dependentOn].answer[this.super_answer][this.question.num];
    //       }
    //     }
    //   }
    // }
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

    //if(this.localStorage.isFixedAnswerQuestionAnswered(this.dependentOn, this.if_super_answer)) {
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
    // if(this.localStorage.isFixedAnswerQuestionAnswered(this.dependentOn, this.super_answer)) {
    //   if (this.localStorage.get('questions')) {
    //     const localStorageQuestions = JSON.parse(this.localStorage.get('questions'));
    //     if (localStorageQuestions[this.dependentOn]) {
    //       if (localStorageQuestions[this.dependentOn].answer) {
    //         if (!localStorageQuestions[this.dependentOn].answer[this.super_answer]) {
    //           localStorageQuestions[this.dependentOn].answer[this.super_answer] = []
    //         }
    //         if (!localStorageQuestions[this.dependentOn].answer[this.super_answer][this.question.num]) {
    //           localStorageQuestions[this.dependentOn].answer[this.super_answer][this.question.num] = {};
    //         }
    //         this.localStorage.set('questions', JSON.stringify(localStorageQuestions));
    //         this.resumeLocalStorageAnswer();
    //       }
    //     }
    //   }
    // }
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
    // if (this.type === 'checkbox') {
    //   if (this.form.value[n]) {
    //     if (!this.values) {
    //       this.values = [];
    //     }
    //     this.values.push(response);
    //   } else {
    //     this.values = this.values.filter((val, i, arr) => {
    //       if (val !== response) {
    //         return val;
    //       }
    //     });
    //   }
    // } else if (this.type === 'radiobutton' || this.type === 'textbox' || this.type === 'select') {
    //   this.values = [this.form.value.value];
    // }
    // console.log('Updated ' + this.question.question + ': ' + this.values);
    // const savedQuestion = JSON.parse(this.localStorage.get('questions'));
    // if (!savedQuestion[this.dependentOn.num]) {
    //   savedQuestion[this.dependentOn.num] = {};
    // }
    // if (!savedQuestion[this.dependentOn.num].answer[this.super_answer]) {
    //   savedQuestion[this.dependentOn.num].answer[this.super_answer] = {};
    // }
    // if (!savedQuestion[this.dependentOn.num].answer[this.super_answer][this.question.num]) {
    //   savedQuestion[this.dependentOn.num].answer[this.super_answer][this.question.num] = {};
    // }
    // savedQuestion[this.dependentOn.num].answer[this.super_answer][this.question.num].question = this.question.question;
    // savedQuestion[this.dependentOn.num].answer[this.super_answer][this.question.num].answer = this.values;
    // // console.log(savedQuestion);
    // this.localStorage.set('questions', JSON.stringify(savedQuestion));

    this.changeValue = Math.random();
  }

}
