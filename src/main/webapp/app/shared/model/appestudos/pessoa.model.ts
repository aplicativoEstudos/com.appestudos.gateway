export interface IPessoa {
  id?: number;
  fotoContentType?: string;
  foto?: any;
  nome?: string;
  sobrenome?: string;
  email?: string;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public fotoContentType?: string,
    public foto?: any,
    public nome?: string,
    public sobrenome?: string,
    public email?: string
  ) {}
}
