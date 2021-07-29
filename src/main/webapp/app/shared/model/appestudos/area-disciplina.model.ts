import { IDisciplina } from "./disciplina.model";

export interface IAreaDisciplina {
  id?: number;
  geral?: boolean;
  areaNoma?: string;
  areaId?: number;
  disciplinaNomeDisciplina?: string;
  disciplinaId?: number;
}

export class AreaDisciplina implements IAreaDisciplina {
  constructor(
    public id?: number,
    public geral?: boolean,
    public areaNoma?: string,
    public areaId?: number,
    public disciplinaNomeDisciplina?: string,
    public disciplinaId?: number
  ) {
    this.geral = this.geral || false;
  }
}
