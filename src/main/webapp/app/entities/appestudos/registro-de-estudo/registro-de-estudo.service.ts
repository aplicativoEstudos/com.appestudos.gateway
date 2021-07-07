import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

type EntityResponseType = HttpResponse<IRegistroDeEstudo>;
type EntityArrayResponseType = HttpResponse<IRegistroDeEstudo[]>;

@Injectable({ providedIn: 'root' })
export class RegistroDeEstudoService {
  public resourceUrl = SERVER_API_URL + 'services/appestudos/api/registro-de-estudos';

  constructor(protected http: HttpClient) {}

  create(registroDeEstudo: IRegistroDeEstudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registroDeEstudo);
    return this.http
      .post<IRegistroDeEstudo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(registroDeEstudo: IRegistroDeEstudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registroDeEstudo);
    return this.http
      .put<IRegistroDeEstudo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRegistroDeEstudo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegistroDeEstudo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(registroDeEstudo: IRegistroDeEstudo): IRegistroDeEstudo {
    const copy: IRegistroDeEstudo = Object.assign({}, registroDeEstudo, {
      data: registroDeEstudo.data && registroDeEstudo.data.isValid() ? registroDeEstudo.data.format(DATE_FORMAT) : undefined,
      horaInicial:
        registroDeEstudo.horaInicial && registroDeEstudo.horaInicial.isValid() ? registroDeEstudo.horaInicial.toJSON() : undefined,
      horaFinal: registroDeEstudo.horaFinal && registroDeEstudo.horaFinal.isValid() ? registroDeEstudo.horaFinal.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
      res.body.horaInicial = res.body.horaInicial ? moment(res.body.horaInicial) : undefined;
      res.body.horaFinal = res.body.horaFinal ? moment(res.body.horaFinal) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((registroDeEstudo: IRegistroDeEstudo) => {
        registroDeEstudo.data = registroDeEstudo.data ? moment(registroDeEstudo.data) : undefined;
        registroDeEstudo.horaInicial = registroDeEstudo.horaInicial ? moment(registroDeEstudo.horaInicial) : undefined;
        registroDeEstudo.horaFinal = registroDeEstudo.horaFinal ? moment(registroDeEstudo.horaFinal) : undefined;
      });
    }
    return res;
  }
}
