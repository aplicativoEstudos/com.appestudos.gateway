import { Moment } from 'moment';
import { Area } from './area.model';
import { Disciplina } from './disciplina.model';
import { Pessoa } from './pessoa.model';

export interface IRegistroDeEstudo {
  id?: number;
  horaInicial?: Moment;
  duracaoTempo?: string;
  areaId?: number;
  disciplinaId?: number;
  pessoaId?: number;
  area?: Area;
  disciplina?: Disciplina;
  pessoa?: Pessoa;
}

export class RegistroDeEstudo implements IRegistroDeEstudo {
  constructor(
    public id?: number,
    public horaInicial?: Moment,
    public duracaoTempo?: string,
    public areaId?: number,
    public disciplinaId?: number,
    public pessoaId?: number,
    public area?: Area,
    public disciplina?: Disciplina,
    public pessoa?: Pessoa
  ) {}
}
