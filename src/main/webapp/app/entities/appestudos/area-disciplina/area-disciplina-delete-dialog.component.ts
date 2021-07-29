import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';
import { AreaDisciplinaService } from './area-disciplina.service';

@Component({
  templateUrl: './area-disciplina-delete-dialog.component.html',
})
export class AreaDisciplinaDeleteDialogComponent {
  areaDisciplina?: IAreaDisciplina;

  constructor(
    protected areaDisciplinaService: AreaDisciplinaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.areaDisciplinaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('areaDisciplinaListModification');
      this.activeModal.close();
    });
  }
}
