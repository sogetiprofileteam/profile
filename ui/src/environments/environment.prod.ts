import { HttpHeaders } from '@angular/common/http';

const api = {
  url: 'https://sogeti-profile-api-dev.herokuapp.com',
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
