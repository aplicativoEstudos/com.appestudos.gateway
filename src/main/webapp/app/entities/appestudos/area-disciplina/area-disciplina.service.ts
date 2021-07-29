import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';

type EntityResponseType = HttpResponse<IAreaDisciplina>;
type EntityArrayResponseType = HttpResponse<IAreaDisciplina[]>;

@Injectable({ providedIn: 'root' })
export class AreaDisciplinaService {
  public resourceUrl = SERVER_API_URL + 'services/appestudos/api/area-disciplinas';

  constructor(protected http: HttpClient) {}

  create(areaDisciplina: IAreaDisciplina): Observable<EntityResponseType> {
    return this.http.post<IAreaDisciplina>(this.resourceUrl, areaDisciplina, { observe: 'response' });
  }

  update(areaDisciplina: IAreaDisciplina): Observable<EntityResponseType> {
    return this.http.put<IAreaDisciplina>(this.resourceUrl, areaDisciplina, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAreaDisciplina>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAreaDisciplina[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
