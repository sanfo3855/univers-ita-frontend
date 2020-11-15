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
  originalMeasurement: any;
  symbolOrderedByAtenei = null;
  symbolOrderedByMisurazioni = null;
  loading = false;

  constructor(private titleService: Title, private localStorage: LocalStorageService, private backendService: BackendApiService) {
    this.titleService.setTitle("Monitoraggio - UniverS-ITA");
  }

  ngOnInit(): void {
    this.localStorage.setJSON('last-page',{page:'Statistiche'})
    this.getDataStats();
  }

  async getDataStats(){
    setTimeout(() => { // here
      this.loading = true;
    }, 100);
    this.backendService.getDataStats().subscribe(data =>{
      this.originalMeasurement = data;
      this.measurements = data;
    });
    setTimeout(() => { // here
      this.loading = false;
    }, 400);
  }

  orderByAtenei(){
    if(this.symbolOrderedByAtenei === null) {
      console.log(true);
      this.symbolOrderedByAtenei = true;
      this.measurements.sort((a,b) => {
        const x = a.username;
        const y = b.username;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
    } else if(this.symbolOrderedByAtenei === true) {
      console.log(false);
      this.symbolOrderedByAtenei = false;
      this.measurements.sort((a,b) => {
        const x = a.username;
        const y = b.username;
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      })
    } else if(this.symbolOrderedByAtenei === false) {
      console.log(null);
      this.symbolOrderedByAtenei = null;
      this.measurements = this.originalMeasurement;
    }
    this.symbolOrderedByMisurazioni = null;
  }

  orderByMisurazioni(){
    if(this.symbolOrderedByMisurazioni === null) {
      console.log(true);
      this.symbolOrderedByMisurazioni = true;
      this.measurements.sort((a,b) => {
        const x = a.count;
        const y = b.count;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
    } else if(this.symbolOrderedByMisurazioni === true) {
      console.log(false);
      this.symbolOrderedByMisurazioni = false;
      this.measurements.sort((a,b) => {
        const x = a.count;
        const y = b.count;
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      })
    } else if(this.symbolOrderedByMisurazioni === false) {
      console.log(null);
      this.symbolOrderedByMisurazioni = null;
      this.measurements = this.originalMeasurement;
    }
    this.symbolOrderedByAtenei = null;
  }

}
