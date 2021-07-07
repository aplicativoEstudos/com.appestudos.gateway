import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArea, Area } from 'app/shared/model/appestudos/area.model';
import { AreaService } from './area.service';

@Component({
  selector: 'jhi-area-update',
  templateUrl: './area-update.component.html',
})
export class AreaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    noma: [],
  });

  constructor(protected areaService: AreaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ area }) => {
      this.updateForm(area);
    });
  }

  updateForm(area: IArea): void {
    this.editForm.patchValue({
      id: area.id,
      noma: area.noma,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const area = this.createFromForm();
    if (area.id !== undefined) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  private createFromForm(): IArea {
    return {
      ...new Area(),
      id: this.editForm.get(['id'])!.value,
      noma: this.editForm.get(['noma'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>): void {
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
}
