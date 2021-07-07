import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegistroDeEstudo, RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';
import { RegistroDeEstudoService } from './registro-de-estudo.service';
import { RegistroDeEstudoComponent } from './registro-de-estudo.component';
import { RegistroDeEstudoDetailComponent } from './registro-de-estudo-detail.component';
import { RegistroDeEstudoUpdateComponent } from './registro-de-estudo-update.component';

@Injectable({ providedIn: 'root' })
export class RegistroDeEstudoResolve implements Resolve<IRegistroDeEstudo> {
  constructor(private service: RegistroDeEstudoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegistroDeEstudo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((registroDeEstudo: HttpResponse<RegistroDeEstudo>) => {
          if (registroDeEstudo.body) {
            return of(registroDeEstudo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegistroDeEstudo());
  }
}

export const registroDeEstudoRoute: Routes = [
  {
    path: '',
    component: RegistroDeEstudoComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayappestudosApp.appestudosRegistroDeEstudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegistroDeEstudoDetailComponent,
    resolve: {
      registroDeEstudo: RegistroDeEstudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosRegistroDeEstudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegistroDeEstudoUpdateComponent,
    resolve: {
      registroDeEstudo: RegistroDeEstudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosRegistroDeEstudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegistroDeEstudoUpdateComponent,
    resolve: {
      registroDeEstudo: RegistroDeEstudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayappestudosApp.appestudosRegistroDeEstudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
