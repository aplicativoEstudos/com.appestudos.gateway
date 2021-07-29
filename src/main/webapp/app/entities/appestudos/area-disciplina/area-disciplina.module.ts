import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayappestudosSharedModule } from 'app/shared/shared.module';
import { AreaDisciplinaComponent } from './area-disciplina.component';
import { AreaDisciplinaDetailComponent } from './area-disciplina-detail.component';
import { AreaDisciplinaUpdateComponent } from './area-disciplina-update.component';
import { AreaDisciplinaDeleteDialogComponent } from './area-disciplina-delete-dialog.component';
import { areaDisciplinaRoute } from './area-disciplina.route';

@NgModule({
  imports: [GatewayappestudosSharedModule, RouterModule.forChild(areaDisciplinaRoute)],
  declarations: [
    AreaDisciplinaComponent,
    AreaDisciplinaDetailComponent,
    AreaDisciplinaUpdateComponent,
    AreaDisciplinaDeleteDialogComponent,
  ],
  entryComponents: [AreaDisciplinaDeleteDialogComponent],
})
export class AppestudosAreaDisciplinaModule {}
