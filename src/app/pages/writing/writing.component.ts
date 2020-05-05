import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../@core/services/backend-api/backend-api.service';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {
  textForm = new FormGroup({
    textarea: new FormControl('')
  });

  writingText: any;

  constructor(private backendApiService: BackendApiService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const wt = this.localStorage.get('writing-text');
    this.writingText = wt ? JSON.parse(wt) : {text: '', locked: false};
    if (this.writingText.text) {
      this.textForm.setValue({textarea: this.writingText.text});
    }
  }

  onSubmit() {
    this.writingText.text = this.textForm.value.textarea;
    this.localStorage.set('writing-text', JSON.stringify(this.writingText));
  }
}
