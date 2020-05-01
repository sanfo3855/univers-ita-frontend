import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendApiService} from '../../@core/services/backend-api/backend-api.service';
import {LocalStorageService} from '../../@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit{
  textForm = new FormGroup({
    textarea: new FormControl('')
  });

  constructor(private backendApiService: BackendApiService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    if (this.localStorage.get('writing-text')) {
      this.textForm.setValue({textarea: this.localStorage.get('writing-text')});
    }
  }

  onSubmit() {
    const formValues = this.textForm.value;
    this.localStorage.set('writing-text', formValues.textarea);
  }
}
