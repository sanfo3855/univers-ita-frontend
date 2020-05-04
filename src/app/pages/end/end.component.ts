import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(public localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

}
