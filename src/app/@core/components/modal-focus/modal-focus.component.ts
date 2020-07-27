import {Component, Input, Type, HostListener, Directive} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {BackendApiService} from '../../services/backend-api/backend-api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Caricamento Testo e Questionario</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Stai per confermare il caricamento del  <span class="text-primary">testo scritto</span> e delle <span class="text-primary">risposte al questionario</span></strong></p>
    <p>Controlla che le risposte fornite siano corrette.
    <span class="text-danger">Non potrai più modificarle</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-focus',
  templateUrl: './modal-focus.component.html',
  styleUrls: ['./modal-focus.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalFocus {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  // tslint:disable-next-line:variable-name
  constructor(private _modalService: NgbModal,
              private localStorage: LocalStorageService,
              private backendService: BackendApiService) {}

  @Input() enabled: boolean;

  open(name: string) {
    this._modalService.open(MODALS[name]).result.then((result) => {
      console.log(result);
      if (result === 'Ok click') {
        this.uploadTextNQuestions();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // @Directive({selector:})

  uploadTextNQuestions(): void {
    const text = this.localStorage.getJSON('writing-text').text;
    const questions = this.localStorage.getJSON('questions');
    this.backendService.uploadTextNQuestion(text, questions).subscribe((data) => {
      console.log('sent');
    });
  }
}
