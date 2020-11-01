import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
export class SurveyComponent implements OnChanges {

  sectionObj = questionJson.default.survey;
  sections: any[] = [];
  lastSection: any;

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title, private localStorage: LocalStorageService, private backendService: BackendApiService) {
    if(this.activatedRoute.snapshot.queryParams['sezione']) {
      for (let sez of this.activatedRoute.snapshot.queryParams['sezione']) {
        this.sections.push(sez);
        this.lastSection = sez;
      }
    }
    this.titleService.setTitle("Questionario (sezione " + this.lastSection + ")  - UniverS-ITA");
  }

  ngOnChanges(): void {}

  sendToBackend() {
    const text = this.localStorage.getJSON('writing-text').text;
    const questions = this.localStorage.getJSON('questions');
    this.backendService.uploadTextNQuestion(text, questions).subscribe((data) => {
      console.log('Testo e Riposte questionario inviate');
    });
  }

}
