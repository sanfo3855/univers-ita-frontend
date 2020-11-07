import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private titleService: Title, private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Statistiche'})
  }

}
