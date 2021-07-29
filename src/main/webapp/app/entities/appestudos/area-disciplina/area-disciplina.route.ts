import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAreaDisciplina, AreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';
import { AreaDisciplinaService } from './area-disciplina.service';
import { AreaDisciplinaComponent } from './area-disciplina.component';
import { AreaDisciplinaDetailComponent } from './area-disciplina-detail.component';
import { AreaDisciplinaUpdateComponent } from './area-disciplina-update.component';

@Injectable({ providedIn: 'root' })
export class AreaDisciplinaResolve implements Resolve<IAreaDisciplina> {
  constructor(private service: AreaDisciplinaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAreaDisciplina> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((areaDisciplina: HttpResponse<AreaDisciplina>) => {
          if (areaDisciplina.body) {
            return of(areaDisciplina.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AreaDisciplina());
  }
}

export const areaDisciplinaRoute: Routes = [
  {
    path: '',
    component: AreaDisciplinaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayappestudosApp.appestudosAreaDisciplina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AreaDisciplinaDetailComponent,
    resolve: {
      areaDisciplina: AreaDisciplinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosAreaDisciplina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AreaDisciplinaUpdateComponent,
    resolve: {
      areaDisciplina: AreaDisciplinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosAreaDisciplina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AreaDisciplinaUpdateComponent,
    resolve: {
      areaDisciplina: AreaDisciplinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosAreaDisciplina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
