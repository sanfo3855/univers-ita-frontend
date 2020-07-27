import { Component, OnInit } from '@angular/core';
import * as questionJson from '../../../assets/question-config.json';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  questionObj = questionJson.default.survey;

  constructor() {}

  ngOnInit(): void {}

}
