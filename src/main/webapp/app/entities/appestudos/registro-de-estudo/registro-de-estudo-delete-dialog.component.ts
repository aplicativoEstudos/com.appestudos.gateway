import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';
import { RegistroDeEstudoService } from './registro-de-estudo.service';

@Component({
  templateUrl: './registro-de-estudo-delete-dialog.component.html',
})
export class RegistroDeEstudoDeleteDialogComponent {
  registroDeEstudo?: IRegistroDeEstudo;

  constructor(
    protected registroDeEstudoService: RegistroDeEstudoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.registroDeEstudoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('registroDeEstudoListModification');
      this.activeModal.close();
    });
  }
}
