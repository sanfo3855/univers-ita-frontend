import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import * as questionJson from '../../../assets/question-config.json';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";
import {BackendApiService} from "../../@core/services/backend-api/backend-api.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnChanges {

  sectionObj = questionJson.default.survey;
  sections: any[] = [];
  lastSection: any;
  showError: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private titleService: Title, private localStorage: LocalStorageService, private backendService: BackendApiService) {
    if(this.activatedRoute.snapshot.queryParams['sezione']) {
      for (let sez of this.activatedRoute.snapshot.queryParams['sezione']) {
        this.sections.push(sez);
        this.lastSection = sez;
      }
    }
    this.titleService.setTitle("Questionario (sezione " + this.lastSection + ")  - UniverS-ITA");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Questionario', queryParams: this.activatedRoute.snapshot.queryParams})
  }

  ngOnChanges(): void {}

  sendToBackend() {
    const sentToBE = this.localStorage.getJSON('sent-to-be');
    if(sentToBE && sentToBE!==true){
      const text = this.localStorage.getJSON('writing-text').text;
      const questions = this.localStorage.getJSON('questions');
      const student = this.localStorage.get('student');
      this.backendService.uploadTextNQuestion(text, questions ,student).subscribe((data) => {
        console.log('Testo e Riposte questionario inviate a BE');
        this.localStorage.set('sent-to-be','true');
      });
    } else {
      console.log('Testo e Riposte questionario già inviate una volta');
    }
  }

  checkResponseAndNavigate(routerLink, queryParams?){
    if(this.checkResponded()){
      if(routerLink === '/fine') this.sendToBackend();
      this.router.navigate([routerLink], { queryParams: queryParams });
    } else {
      this.showError = true;
    }
  }

  checkResponded() {
    let allResponses = this.localStorage.getJSON('isRespondedList');
    let returnValue = true;
    for(let sectionNum of this.sections) {
      for (let singleQuestion of this.sectionObj[sectionNum].questions) {
        returnValue = returnValue && this.checkQuestion(singleQuestion, allResponses);
      }
    }
    console.log("Check responded: " + returnValue);
    return returnValue;
  }

  checkQuestion(question,allResponse) {
    let returnValue = allResponse[question.question.num] !== null ? allResponse[question.question.num] : true;
    if(question.inline_sub_questions){
      let breakCheck = ''
      for(let inline of question.inline_sub_questions) {
        if(inline.question.num === breakCheck) break;
        else {
          breakCheck = inline.question.num
          returnValue = returnValue && this.checkQuestion(inline,allResponse);
        }
      }
    }
    if(question.dependant_sub_questions){
      for(let dependant of question.dependant_sub_questions) {
        returnValue = returnValue && this.checkQuestion(dependant,allResponse);
      }
    }
    return returnValue;
  }



}
