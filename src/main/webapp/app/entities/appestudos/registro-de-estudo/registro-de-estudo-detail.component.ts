import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

@Component({
  selector: 'jhi-registro-de-estudo-detail',
  templateUrl: './registro-de-estudo-detail.component.html',
})
export class RegistroDeEstudoDetailComponent implements OnInit {
  registroDeEstudo: IRegistroDeEstudo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ registroDeEstudo }) => (this.registroDeEstudo = registroDeEstudo));
  }

  previousState(): void {
    window.history.back();
  }
}
