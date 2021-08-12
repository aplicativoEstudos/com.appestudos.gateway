import { Route } from '@angular/router';
import { Authority } from 'app/shared/constants/authority.constants';

import { FooterComponent } from './footer.component';

export const footerRoute: Route = {
  path: '',
  component: FooterComponent,
  outlet: 'footer',
};
