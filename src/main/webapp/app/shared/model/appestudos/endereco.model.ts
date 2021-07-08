export interface IEndereco {
  id?: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  cep?: string;
  numero?: number;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public cidade?: string,
    public bairro?: string,
    public rua?: string,
    public cep?: string,
    public numero?: number
  ) {}
}
