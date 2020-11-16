import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';
import {Title} from "@angular/platform-browser";
import {BackendApiService} from "../../@core/services/backend-api/backend-api.service";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  writingText: any;
  questions: any;
  responseLucky: any;

  constructor(public localStorage: LocalStorageService, private titleService: Title, private backendService:BackendApiService) {
    this.titleService.setTitle("Fine - UniverS-ITA");
    let lucky = this.localStorage.getJSON('imFeelingLucky')
    if(lucky != null) {
      this.responseLucky = lucky
    }
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'fine'})

  }

  imFeelingLucky(){
    this.backendService.imFeelingLucky().subscribe((response) => {
      console.log("Lucky: " + response['lucky'] + " - Code: " + response['code']);
      this.localStorage.set('imFeelingLucky',JSON.stringify(response))
      this.responseLucky = response['response'];
    });

  }

}
