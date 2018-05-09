import { HttpHeaders } from '@angular/common/http';

const api = {
  url: 'http://localhost:3000',
  resources: {
    search: '/search',
    profile: '/profile'
  },
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
};

export const environment = {
  production: true,
  api: api
};
