import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';
import {Title} from "@angular/platform-browser";
import {BackendApiService} from "../../@core/services/backend-api/backend-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  writingText: any;
  questions: any;
  responseLucky: any;
  loading = false;

  constructor(public localStorage: LocalStorageService, private titleService: Title,
              private backendService:BackendApiService, private router: Router) {
    this.titleService.setTitle("Fine - UniverS-ITA");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'fine'})
    let lucky = this.localStorage.getJSON('imFeelingLucky')
    if(Object.keys(lucky).length) {
      this.responseLucky = lucky
    } else {
      this.responseLucky = null
    }
  }

  imFeelingLucky(){
    setTimeout(()=>{
      this.loading = true;
    },1);
    let student = this.localStorage.get('student');
    this.backendService.imFeelingLucky(student).subscribe((response) => {
      //console.log("Lucky: " + response['response']['lucky'] + " - Code: " + response['response']['code']);
      this.localStorage.set('imFeelingLucky',JSON.stringify(response['response']))
      this.responseLucky = response['response'];
      setTimeout(()=>{
        this.loading = false;
        if(this.responseLucky['lucky']){
          this.router.navigate(['/buono-studente']);
        }
      },399);

    });
  }

}
