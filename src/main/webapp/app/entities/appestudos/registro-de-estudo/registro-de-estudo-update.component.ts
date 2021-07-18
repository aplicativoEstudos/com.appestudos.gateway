import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRegistroDeEstudo, RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';
import { RegistroDeEstudoService } from './registro-de-estudo.service';
import { IArea } from 'app/shared/model/appestudos/area.model';
import { AreaService } from 'app/entities/appestudos/area/area.service';
import { IDisciplina } from 'app/shared/model/appestudos/disciplina.model';
import { DisciplinaService } from 'app/entities/appestudos/disciplina/disciplina.service';
import { IPessoa } from 'app/shared/model/appestudos/pessoa.model';
import { PessoaService } from 'app/entities/appestudos/pessoa/pessoa.service';

type SelectableEntity = IArea | IDisciplina | IPessoa;

@Component({
  selector: 'jhi-registro-de-estudo-update',
  templateUrl: './registro-de-estudo-update.component.html',
})
export class RegistroDeEstudoUpdateComponent implements OnInit {
  isSaving = false;
  areas: IArea[] = [];
  disciplinas: IDisciplina[] = [];
  pessoas: IPessoa[] = [];

  editForm = this.fb.group({
    id: [],
    horaInicial: [],
    horaFinal: [],
    duracaoTempo: [],
    areaId: [null, Validators.required],
    disciplinaId: [null, Validators.required],
    pessoaId: [null, Validators.required],
  });

  constructor(
    protected registroDeEstudoService: RegistroDeEstudoService,
    protected areaService: AreaService,
    protected disciplinaService: DisciplinaService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ registroDeEstudo }) => {
      if (!registroDeEstudo.id) {
        const today = moment().startOf('day');
        registroDeEstudo.horaInicial = today;
        registroDeEstudo.horaFinal = today;
      }

      this.updateForm(registroDeEstudo);

      this.areaService.query().subscribe((res: HttpResponse<IArea[]>) => (this.areas = res.body || []));

      this.disciplinaService.query().subscribe((res: HttpResponse<IDisciplina[]>) => (this.disciplinas = res.body || []));

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
    });
  }

  updateForm(registroDeEstudo: IRegistroDeEstudo): void {
    this.editForm.patchValue({
      id: registroDeEstudo.id,
      horaInicial: registroDeEstudo.horaInicial ? registroDeEstudo.horaInicial.format(DATE_TIME_FORMAT) : null,
      duracaoTempo: registroDeEstudo.duracaoTempo,
      areaId: registroDeEstudo.areaId,
      disciplinaId: registroDeEstudo.disciplinaId,
      pessoaId: registroDeEstudo.pessoaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const registroDeEstudo = this.createFromForm();
    if (registroDeEstudo.id !== undefined) {
      this.subscribeToSaveResponse(this.registroDeEstudoService.update(registroDeEstudo));
    } else {
      this.subscribeToSaveResponse(this.registroDeEstudoService.create(registroDeEstudo));
    }
  }

  private createFromForm(): IRegistroDeEstudo {
    return {
      ...new RegistroDeEstudo(),
      id: this.editForm.get(['id'])!.value,
      horaInicial: this.editForm.get(['horaInicial'])!.value
        ? moment(this.editForm.get(['horaInicial'])!.value, DATE_TIME_FORMAT)
        : undefined,
      duracaoTempo: this.editForm.get(['duracaoTempo'])!.value,
      areaId: this.editForm.get(['areaId'])!.value,
      disciplinaId: this.editForm.get(['disciplinaId'])!.value,
      pessoaId: this.editForm.get(['pessoaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegistroDeEstudo>>): void {
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
