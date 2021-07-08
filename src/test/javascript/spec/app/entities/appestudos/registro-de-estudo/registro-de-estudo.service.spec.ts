import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';
import { IRegistroDeEstudo, RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

describe('Service Tests', () => {
  describe('RegistroDeEstudo Service', () => {
    let injector: TestBed;
    let service: RegistroDeEstudoService;
    let httpMock: HttpTestingController;
    let elemDefault: IRegistroDeEstudo;
    let expectedResult: IRegistroDeEstudo | IRegistroDeEstudo[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RegistroDeEstudoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RegistroDeEstudo(0, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            horaInicial: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RegistroDeEstudo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaInicial: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInicial: currentDate,
            horaFinal: currentDate,
          },
          returnedFromService
        );

        service.create(new RegistroDeEstudo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RegistroDeEstudo', () => {
        const returnedFromService = Object.assign(
          {
            horaInicial: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            duracaoTempo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInicial: currentDate,
            horaFinal: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RegistroDeEstudo', () => {
        const returnedFromService = Object.assign(
          {
            horaInicial: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            duracaoTempo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInicial: currentDate,
            horaFinal: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RegistroDeEstudo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
