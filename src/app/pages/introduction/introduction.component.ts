import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private titleService: Title, public localStorage: LocalStorageService) {
    this.titleService.setTitle("Introduzione - UniverS-Ita");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Introduzione'})
  }

}
