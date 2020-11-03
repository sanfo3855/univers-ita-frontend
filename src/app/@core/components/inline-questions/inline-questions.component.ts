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

  @Input() dependentOn: any;
  @Input() top_answer: any;
  @Input() enabling_response: any;
  @Input() super_responses: any;

  @Input() enabled: any;
  @Input() index: any


  @Input() changeValueTrigger: any;
  changeValue: any;

  inline_responses = [];

  show = false;
  constructor(private localStorage: LocalStorageService) {
  }

  isEnabled() {
    if(this.inline_sub_question_item.super_answers === undefined) {
      return true;
    } else {
      if(this.super_responses.length > 0) {
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
    //RESTORE RESPONSES FROM LOCAL STORAGE
    const questions =  this.localStorage.getJSON('questions');
    if(questions[this.dependentOn]){
      if(questions[this.dependentOn].answer) {
        if(questions[this.dependentOn].answer[this.top_answer]){
          if(questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num]) {
            if(questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num].answer){
              savedResponse = questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num].answer;
            }
          }
        }
      }
    }
    //INITIALIZE FORM WITH RESPONSES
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
    if(!this.isEnabled()){
      const questions =  this.localStorage.getJSON('questions');
      if(questions[this.dependentOn]) {
        if (questions[this.dependentOn].answer) {
          if (questions[this.dependentOn].answer[this.top_answer]) {
            if (!questions[this.dependentOn].answer[this.top_answer]["-1"]) {
              questions[this.dependentOn].answer[this.top_answer]["-1"] = "";
            }
          }
        }
      }
      this.localStorage.set('questions', JSON.stringify(questions));
    }
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

  async onSubmit(response?: string, n?: number) {
    // GET RESPONSES
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
    console.log('Question inline: ' + this.inline_sub_question_item.question.question + ' - Responses inline: ' + this.inline_responses);

    // SAVE TO LOCAL STORAGE
    const questions =  this.localStorage.getJSON('questions');
    if(this.isEnabled()) {
      console.log(this.dependentOn + " " + this.enabling_response + " " + this.inline_sub_question_item.question.num);
      if(questions[this.dependentOn]) {
        if(questions[this.dependentOn].answer[this.top_answer]) {
          if(!questions[this.dependentOn].answer[this.top_answer]) {
            questions[this.dependentOn].answer[this.top_answer] = {}
          }
          if(!questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num]) {
            questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num] = {};
          }
          questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num].question = this.inline_sub_question_item.question.question;
          questions[this.dependentOn].answer[this.top_answer][this.inline_sub_question_item.question.num].answer = this.inline_responses;
        }
      }
    }
    this.localStorage.set('questions', JSON.stringify(questions));

    // TRIGGER ONCHANGE
    this.changeValue = Math.random();
  }

}
