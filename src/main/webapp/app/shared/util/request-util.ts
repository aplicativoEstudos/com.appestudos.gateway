import { HttpParams } from '@angular/common/http';

export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};

export const removerCamposVaziosDoRequest = (request: any): any => {
  for (const property in request) {
    if (request[property] === '' || request[property] === undefined || request[property] === null) {
      delete request[property];
    } else {
      const aux = request[property];
      if (aux && aux.length === 0) {
        delete request[property];
      }
    }
  }

  return request;
};

export const sort = (sortField: any, sortOrder: any, predicate: string, ascending: boolean): string[] => {
  let result: string[] = [];

  if (sortField) {
    result = [sortField + ',' + (sortOrder === 1 ? 'asc' : 'desc')];
  } else {
    result = [predicate + ',' + (ascending ? 'asc' : 'desc')];
  }
  return result;
};
