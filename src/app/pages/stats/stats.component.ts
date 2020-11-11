import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../@core/services/local-storage/local-storage.service";
import {BackendApiService} from "../../@core/services/backend-api/backend-api.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  measurements: any;

  constructor(private titleService: Title, private localStorage: LocalStorageService, private backendService: BackendApiService) {
    this.titleService.setTitle("Monitoraggio - UniverS-ITA");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Statistiche'})
    this.backendService.getDataStats().subscribe(data =>{
      this.measurements = data;
    });
  }

}
