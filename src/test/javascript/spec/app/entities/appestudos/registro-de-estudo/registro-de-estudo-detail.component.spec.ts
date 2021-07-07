import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayappestudosTestModule } from '../../../../test.module';
import { RegistroDeEstudoDetailComponent } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo-detail.component';
import { RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

describe('Component Tests', () => {
  describe('RegistroDeEstudo Management Detail Component', () => {
    let comp: RegistroDeEstudoDetailComponent;
    let fixture: ComponentFixture<RegistroDeEstudoDetailComponent>;
    const route = ({ data: of({ registroDeEstudo: new RegistroDeEstudo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayappestudosTestModule],
        declarations: [RegistroDeEstudoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RegistroDeEstudoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegistroDeEstudoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load registroDeEstudo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.registroDeEstudo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
