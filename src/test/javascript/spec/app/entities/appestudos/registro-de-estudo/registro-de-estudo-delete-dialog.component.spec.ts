import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayappestudosTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { RegistroDeEstudoDeleteDialogComponent } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo-delete-dialog.component';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';

describe('Component Tests', () => {
  describe('RegistroDeEstudo Management Delete Component', () => {
    let comp: RegistroDeEstudoDeleteDialogComponent;
    let fixture: ComponentFixture<RegistroDeEstudoDeleteDialogComponent>;
    let service: RegistroDeEstudoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayappestudosTestModule],
        declarations: [RegistroDeEstudoDeleteDialogComponent],
      })
        .overrideTemplate(RegistroDeEstudoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegistroDeEstudoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegistroDeEstudoService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
