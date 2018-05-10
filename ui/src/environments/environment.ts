import { HttpHeaders } from '@angular/common/http';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const api = {
  url: 'http://localhost:3000',
  resources: {
    search: '/search',
    profile: '/profile/'
  },
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
};

export const environment = {
  production: false,
  api: api
};
