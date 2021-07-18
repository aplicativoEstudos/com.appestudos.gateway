import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegistroDeEstudo, RegistroDeEstudo } from 'app/shared/model/appestudos/registro-de-estudo.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RegistroDeEstudoService } from './registro-de-estudo.service';
import { RegistroDeEstudoDeleteDialogComponent } from './registro-de-estudo-delete-dialog.component';

@Component({
  selector: 'jhi-registro-de-estudo',
  templateUrl: './registro-de-estudo.component.html',
})
export class RegistroDeEstudoComponent implements OnInit, OnDestroy {
  registroDeEstudos?: IRegistroDeEstudo[];
  registroDeEstudo?: IRegistroDeEstudo = {};
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  erro: any = 'correto';

  segundos: any = 0;
  minutos: any = 0;
  horas: any = 0;
  interval: any = 0;

  constructor(
    protected registroDeEstudoService: RegistroDeEstudoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.registroDeEstudoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IRegistroDeEstudo[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        (err: any) => this.onErrorCustom(err)
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInRegistroDeEstudos();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegistroDeEstudo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegistroDeEstudos(): void {
    this.eventSubscriber = this.eventManager.subscribe('registroDeEstudoListModification', () => this.loadPage());
  }

  delete(registroDeEstudo: IRegistroDeEstudo): void {
    const modalRef = this.modalService.open(RegistroDeEstudoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.registroDeEstudo = registroDeEstudo;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IRegistroDeEstudo[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/registro-de-estudo'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.registroDeEstudos = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegistroDeEstudo>>): void {
    result.subscribe(
      () => {this.loadPage()},
      (err: any) => this.onErrorCustom(err)
      );
  }

  protected onErrorCustom(err: any): void {
    this.erro = err.error.detail;
  }

  startTimer(): any {
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

  pauseTimer(): any {
    // this.registroDeEstudo!.duracaoTempo = this.horas+':'+this.minutos+':'+this.segundos;
    // this.subscribeToSaveResponse(this.registroDeEstudoService.create(this.registroDeEstudo!));
    clearInterval(this.interval);
  }
  salvar(): void{
    this.registroDeEstudo!.duracaoTempo = '';
     this.registroDeEstudo!.duracaoTempo = this.horas+':'+this.minutos+':'+this.segundos;
     this.registroDeEstudo!.disciplinaId = 1;
     this.registroDeEstudo!.areaId = 1;
     this.subscribeToSaveResponse(this.registroDeEstudoService.create(this.registroDeEstudo!));
     this.pauseTimer()
     this.minutos = 0; this.segundos = 0; this.horas = 0;
  }

  zerar(): any {
    clearInterval(this.interval);
    this.minutos = 0; this.segundos = 0; this.horas = 0;
  }
}
