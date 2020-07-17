import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  writingText: any;
  questions: any;
  constructor(public localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const wt = this.localStorage.get('writing-text');
    const q = this.localStorage.get('questions');
    this.writingText = wt ? JSON.parse(wt) : {};
    this.questions = q ? JSON.parse(q) : {};
  }

}
