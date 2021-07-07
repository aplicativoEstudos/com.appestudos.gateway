import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayappestudosTestModule } from '../../../../test.module';
import { RegistroDeEstudoUpdateComponent } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo-update.component';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';
import { RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

describe('Component Tests', () => {
  describe('RegistroDeEstudo Management Update Component', () => {
    let comp: RegistroDeEstudoUpdateComponent;
    let fixture: ComponentFixture<RegistroDeEstudoUpdateComponent>;
    let service: RegistroDeEstudoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayappestudosTestModule],
        declarations: [RegistroDeEstudoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RegistroDeEstudoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegistroDeEstudoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegistroDeEstudoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegistroDeEstudo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegistroDeEstudo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
