import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';

@Component({
  selector: 'jhi-area-disciplina-detail',
  templateUrl: './area-disciplina-detail.component.html',
})
export class AreaDisciplinaDetailComponent implements OnInit {
  areaDisciplina: IAreaDisciplina | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaDisciplina }) => (this.areaDisciplina = areaDisciplina));
  }

  previousState(): void {
    window.history.back();
  }
}
