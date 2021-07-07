export interface IDisciplina {
  id?: number;
  nomeDisciplina?: string;
}

export class Disciplina implements IDisciplina {
  constructor(public id?: number, public nomeDisciplina?: string) {}
}
