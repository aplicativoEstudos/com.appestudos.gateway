import { Moment } from 'moment';

export interface IRegistroDeEstudo {
  id?: number;
  data?: Moment;
  horaInicial?: Moment;
  horaFinal?: Moment;
  duracaoTempo?: string;
  areaId?: number;
  disciplinaId?: number;
  pessoaId?: number;
}

export class RegistroDeEstudo implements IRegistroDeEstudo {
  constructor(
    public id?: number,
    public data?: Moment,
    public horaInicial?: Moment,
    public horaFinal?: Moment,
    public duracaoTempo?: string,
    public areaId?: number,
    public disciplinaId?: number,
    public pessoaId?: number
  ) {}
}
