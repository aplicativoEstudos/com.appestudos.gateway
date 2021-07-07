export interface IArea {
  id?: number;
  noma?: string;
}

export class Area implements IArea {
  constructor(public id?: number, public noma?: string) {}
}
