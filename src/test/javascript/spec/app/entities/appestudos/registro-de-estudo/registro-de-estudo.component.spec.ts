import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GatewayappestudosTestModule } from '../../../../test.module';
import { RegistroDeEstudoComponent } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.component';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';
import { RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

describe('Component Tests', () => {
  describe('RegistroDeEstudo Management Component', () => {
    let comp: RegistroDeEstudoComponent;
    let fixture: ComponentFixture<RegistroDeEstudoComponent>;
    let service: RegistroDeEstudoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayappestudosTestModule],
        declarations: [RegistroDeEstudoComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(RegistroDeEstudoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegistroDeEstudoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegistroDeEstudoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegistroDeEstudo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.registroDeEstudos && comp.registroDeEstudos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegistroDeEstudo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.registroDeEstudos && comp.registroDeEstudos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
