import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayappestudosTestModule } from '../../../../test.module';
import { AreaDisciplinaDetailComponent } from 'app/entities/appestudos/area-disciplina/area-disciplina-detail.component';
import { AreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';

describe('Component Tests', () => {
  describe('AreaDisciplina Management Detail Component', () => {
    let comp: AreaDisciplinaDetailComponent;
    let fixture: ComponentFixture<AreaDisciplinaDetailComponent>;
    const route = ({ data: of({ areaDisciplina: new AreaDisciplina(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayappestudosTestModule],
        declarations: [AreaDisciplinaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AreaDisciplinaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AreaDisciplinaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load areaDisciplina on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.areaDisciplina).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
