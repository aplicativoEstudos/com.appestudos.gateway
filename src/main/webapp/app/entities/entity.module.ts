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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayappestudosEntityModule {}
