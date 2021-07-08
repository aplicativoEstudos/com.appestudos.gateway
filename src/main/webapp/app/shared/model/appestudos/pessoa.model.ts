export interface IPessoa {
  id?: number;
  fotoContentType?: string;
  foto?: any;
  nome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  enderecoId?: number;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public fotoContentType?: string,
    public foto?: any,
    public nome?: string,
    public sobrenome?: string,
    public email?: string,
    public telefone?: string,
    public enderecoId?: number
  ) {}
}
