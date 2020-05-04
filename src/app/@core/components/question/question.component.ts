import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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

  values = [];

  constructor(private localStorage: LocalStorageService) {
    this.form = new FormGroup({
      value: new FormControl('')
    });
    if (!this.localStorage.get('questions')){
      this.localStorage.set('questions', JSON.stringify({}));
    }
  }

  ngOnInit(): void {
    // TODO LOAD FROM LOCALSTORAGE PREVIOUS RESPONSE
    if (this.type === 'checkbox') {
      console.log('Inizializzo un checkbox');
    } else if (this.type === 'radiobutton') {
      console.log('Inizializzo un radiobutton');
    } else if (this.type === 'textbox') {
      console.log('Inizializzo un textbox');
    } else if (this.type === 'select') {
      console.log('Inizializzo un select');
    }
  }

  onSubmit(response: string) {
    if (this.type === 'checkbox') {
      if (this.form.value.value) {
        this.values.push(response);
      } else {
        this.values = this.values.filter((val, i, arr) => {
          if (val !== response) {
            return val;
          }
        });
      }
    } else if (this.type === 'radiobutton') {
      this.values = [this.form.value.value];
    } else if (this.type === 'textbox') {
      this.values = [this.form.value.value];
    } else if (this.type === 'select') {
      this.values = [this.form.value.value];
    }
    console.log('Updated ' + this.question.question + ': ' + this.values);
    const savedQuestion = JSON.parse(this.localStorage.get('questions'));
    if (!savedQuestion[this.question.num]) {
      savedQuestion[this.question.num] = {};
    }
    savedQuestion[this.question.num].question = this.question.question;
    savedQuestion[this.question.num].answer = this.values;
    console.log(savedQuestion);
    this.localStorage.set('questions', JSON.stringify(savedQuestion));
  }
}
