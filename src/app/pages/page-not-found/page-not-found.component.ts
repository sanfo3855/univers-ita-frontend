import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public router: Router, private titleService: Title) {
    this.titleService.setTitle("Pagina Inesistente - UniverS-Ita");
  }

  ngOnInit(): void {
  }

}
