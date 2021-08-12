import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { IRegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';
import { Observable } from 'rxjs';
import { RegistroDeEstudoService } from 'app/entities/appestudos/registro-de-estudo/registro-de-estudo.service';
import { AreaDisciplinaService } from 'app/entities/appestudos/area-disciplina/area-disciplina.service';
import { IAreaDisciplina } from 'app/shared/model/appestudos/area-disciplina.model';
import { removerCamposVaziosDoRequest } from './../shared/util/request-util';

type SelectableEntity = IAreaDisciplina;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {

  account: Account | null = null;
  radioArea?:any = null;
  areaDisciplinas: IAreaDisciplina[] = [];
  disciplinaId:any = null;
  oculto: any = false;
  ocultoStartPause: any = false;
  descricaoStart: any = 'Iniciar';
  ocultoRelogio: any = false;

  registroDeEstudo?: IRegistroDeEstudo = {};

  segundos: any = 0;
  minutos: any = 0;
  horas: any = 0;
  interval: any = 0;
  
  // declarei essas duas variáveis para aparecer as mensagens.
 
  mensagemSucesso: any;
  mensagemErro: any;

  constructor(
    protected registroDeEstudoService: RegistroDeEstudoService,
    private accountService: AccountService,
    private loginService: LoginService,
    protected areaDisciplinaService: AreaDisciplinaService
    ) {}

  ngOnInit(): void {    
    this.accountService.identity().subscribe(account => {
      this.account = account
      if(this.account===null){
        this.login();
      }
    });

    this.carregarAreaDisciplinas();
    // this.areaDisciplinaService.query()
    // .subscribe((res: HttpResponse<IAreaDisciplina[]>) => (this.areaDisciplinas = res.body || []));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginService.login();
  }
  
  start(): void{
    if(this.radioArea!==null&&this.disciplinaId!=null){
    this.oculto = false;
    this.ocultoStartPause = true;
    this.ocultoRelogio = true;
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
    this.ocultoStartPause = !this.ocultoStartPause;
    this.oculto = true; 
    this.ocultoRelogio = true;
    clearInterval(this.interval);
  }

  cancelar(): void {
    this.zerar();
    this.oculto = false;
    this.ocultoStartPause = false;
    this.ocultoRelogio = false;
  }
  salvar(): void{
    if(this.radioArea!==null&&this.disciplinaId!=null){
    this.registroDeEstudo!.duracaoTempo = '';
     this.registroDeEstudo!.duracaoTempo = this.horas+':'+this.minutos+':'+this.segundos;
     this.registroDeEstudo!.disciplinaId = this.disciplinaId;
     this.registroDeEstudo!.areaId = this.radioArea;
     this.subscribeToSaveResponse(this.registroDeEstudoService.create(this.registroDeEstudo!));
     
     this.cancelar()

         
    //  Mensagem de Salvar não conseguir colocar para desaparecer a mensagem, mas tentei dessa forma ai.
     setTimeout(() => {
      this.mensagemSucesso='salvo com sucesso';
    }, 0);

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

  public carregarAreaDisciplinas(): void {
    if(this.radioArea!==null){
      let request = {};
      // request = this.montarFiltro();

      request['AreaId.equals'] = this.radioArea;
      request = removerCamposVaziosDoRequest(request);

      // this.demandaOrcamentariaService.query(request).subscribe(
      //   (res: HttpResponse<IDemandaOrcamentaria[]>) => this.onSuccess(res.body, res.headers),
      //   (err: any) => this.onError(err)
      // );
      this.areaDisciplinaService.queryComGeral(request)
      .subscribe((res: HttpResponse<IAreaDisciplina[]>) => (this.areaDisciplinas = res.body || []))
    }
  }

  // montarFiltro(): any {
  //   let request = {};
  //   request['AreaId.equals'] = this.radioArea ? this.radioArea : null;


  //   request = removerCamposVaziosDoRequest(request);

  //   // this.montarResumo();
  //   return request;
  // }
}
