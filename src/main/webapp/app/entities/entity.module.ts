import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./appestudos/pessoa/pessoa.module').then(m => m.AppestudosPessoaModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./appestudos/endereco/endereco.module').then(m => m.AppestudosEnderecoModule),
      },
      {
        path: 'area',
        loadChildren: () => import('./appestudos/area/area.module').then(m => m.AppestudosAreaModule),
      },
      {
        path: 'disciplina',
        loadChildren: () => import('./appestudos/disciplina/disciplina.module').then(m => m.AppestudosDisciplinaModule),
      },
      {
        path: 'registro-de-estudo',
        loadChildren: () =>
          import('./appestudos/registro-de-estudo/registro-de-estudo.module').then(m => m.AppestudosRegistroDeEstudoModule),
      },
      {
        path: 'area-disciplina',
        loadChildren: () => import('./appestudos/area-disciplina/area-disciplina.module').then(m => m.AppestudosAreaDisciplinaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayappestudosEntityModule {}
