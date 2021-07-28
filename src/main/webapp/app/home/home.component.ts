import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IDisciplina } from 'app/shared/model/appestudos/disciplina.model';
import { HttpResponse } from '@angular/common/http';
import { DisciplinaService } from 'app/entities/appestudos/disciplina/disciplina.service';
import { timeStamp } from 'console';
import { IRegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';
import { Observable } from 'rxjs';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';

type SelectableEntity = IDisciplina;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {
  account: Account | null = null;
  radioArea?:any = null;
  disciplinas: IDisciplina[] = [];
  disciplinaId:any = null;
  oculto: any = false;

  registroDeEstudo?: IRegistroDeEstudo = {};

  segundos: any = 0;
  minutos: any = 0;
  horas: any = 0;
  interval: any = 0;

  constructor(
    protected registroDeEstudoService: RegistroDeEstudoService,
    private accountService: AccountService,
    private loginService: LoginService,
    protected disciplinaService: DisciplinaService
    ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.account = account));

    this.disciplinaService.query().subscribe((res: HttpResponse<IDisciplina[]>) => (this.disciplinas = res.body || []));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginService.login();
  }

  start(): void{
    if(this.radioArea!==null&&this.disciplinaId!=null){
    this.oculto = true;
    this.interval = setInterval(() => {
      if(this.segundos < 59) {
        this.segundos++;
      } else {
        this.segundos = 0;
        this.minutos++;
        if(this.minutos>59){
          this.minutos = 0;
          this.horas++;
        }
      }
    },1000)
  }
  }

  zerar(): void {
    clearInterval(this.interval);
    this.minutos = 0; this.segundos = 0; this.horas = 0;
  }

  pausar(): void {
    // this.registroDeEstudo!.duracaoTempo = this.horas+':'+this.minutos+':'+this.segundos;
    // this.subscribeToSaveResponse(this.registroDeEstudoService.create(this.registroDeEstudo!));
    clearInterval(this.interval);
  }

  cancelar(): void {
    this.zerar();
    this.oculto = false;
  }
  salvar(): void{
    if(this.radioArea!==null&&this.disciplinaId!=null){
    this.registroDeEstudo!.duracaoTempo = '';
     this.registroDeEstudo!.duracaoTempo = this.horas+':'+this.minutos+':'+this.segundos;
     this.registroDeEstudo!.disciplinaId = this.disciplinaId;
     this.registroDeEstudo!.areaId = this.radioArea;
     this.subscribeToSaveResponse(this.registroDeEstudoService.create(this.registroDeEstudo!));
     this.cancelar()
     this.minutos = 0; this.segundos = 0; this.horas = 0;
    }
  }
  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegistroDeEstudo>>): void {
    result.subscribe(
      () => {this.sucesso()},
      (err: any) => this.onErrorCustom(err)
      );
  }
  protected onErrorCustom(err: any): void {
    // this.erro = err.error.detail;
  }
  protected sucesso(): void {
    // this.erro = err.error.detail;
  }
}
