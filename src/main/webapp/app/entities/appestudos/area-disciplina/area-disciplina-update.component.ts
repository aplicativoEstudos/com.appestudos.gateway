import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAreaDisciplina, AreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';
import { AreaDisciplinaService } from './area-disciplina.service';
import { IArea } from 'app/shared/model/appestudos/area.model';
import { AreaService } from 'app/entities/appestudos/area/area.service';
import { IDisciplina } from 'app/shared/model/appestudos/disciplina.model';
import { DisciplinaService } from 'app/entities/appestudos/disciplina/disciplina.service';

type SelectableEntity = IArea | IDisciplina;

@Component({
  selector: 'jhi-area-disciplina-update',
  templateUrl: './area-disciplina-update.component.html',
})
export class AreaDisciplinaUpdateComponent implements OnInit {
  isSaving = false;
  areas: IArea[] = [];
  disciplinas: IDisciplina[] = [];

  editForm = this.fb.group({
    id: [],
    geral: [],
    areaId: [],
    disciplinaId: [],
  });

  constructor(
    protected areaDisciplinaService: AreaDisciplinaService,
    protected areaService: AreaService,
    protected disciplinaService: DisciplinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaDisciplina }) => {
      this.updateForm(areaDisciplina);

      this.areaService.query().subscribe((res: HttpResponse<IArea[]>) => (this.areas = res.body || []));

      this.disciplinaService.query().subscribe((res: HttpResponse<IDisciplina[]>) => (this.disciplinas = res.body || []));
    });
  }

  updateForm(areaDisciplina: IAreaDisciplina): void {
    this.editForm.patchValue({
      id: areaDisciplina.id,
      geral: areaDisciplina.geral,
      areaId: areaDisciplina.areaId,
      disciplinaId: areaDisciplina.disciplinaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const areaDisciplina = this.createFromForm();
    if (areaDisciplina.id !== undefined) {
      this.subscribeToSaveResponse(this.areaDisciplinaService.update(areaDisciplina));
    } else {
      this.subscribeToSaveResponse(this.areaDisciplinaService.create(areaDisciplina));
    }
  }

  private createFromForm(): IAreaDisciplina {
    return {
      ...new AreaDisciplina(),
      id: this.editForm.get(['id'])!.value,
      geral: this.editForm.get(['geral'])!.value,
      areaId: this.editForm.get(['areaId'])!.value,
      disciplinaId: this.editForm.get(['disciplinaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreaDisciplina>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
