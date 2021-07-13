import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayappestudosSharedModule } from 'app/shared/shared.module';
import { RegistroDeEstudoComponent } from './registro-de-estudo.component';
import { RegistroDeEstudoDetailComponent } from './registro-de-estudo-detail.component';
import { RegistroDeEstudoUpdateComponent } from './registro-de-estudo-update.component';
import { RegistroDeEstudoDeleteDialogComponent } from './registro-de-estudo-delete-dialog.component';
import { registroDeEstudoRoute } from './registro-de-estudo.route';

@NgModule({
  imports: [
    GatewayappestudosSharedModule, 
    RouterModule.forChild(registroDeEstudoRoute)
  ],
  declarations: [
    RegistroDeEstudoComponent,
    RegistroDeEstudoDetailComponent,
    RegistroDeEstudoUpdateComponent,
    RegistroDeEstudoDeleteDialogComponent
  ],
  entryComponents: [RegistroDeEstudoDeleteDialogComponent],
})
export class AppestudosRegistroDeEstudoModule {}
