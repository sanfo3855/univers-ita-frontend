import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Introduzione - UniverS-Ita");
  }

  ngOnInit(): void {
  }

}
