import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GatewayappestudosSharedModule } from 'app/shared/shared.module';
import { GatewayappestudosCoreModule } from 'app/core/core.module';
import { GatewayappestudosAppRoutingModule } from './app-routing.module';
import { GatewayappestudosHomeModule } from './home/home.module';
import { GatewayappestudosEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ActiveMenuFooterDirective } from './layouts/footer/active-menu-footer.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GatewayappestudosSharedModule,
    GatewayappestudosCoreModule,
    GatewayappestudosHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewayappestudosEntityModule,
    GatewayappestudosAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent,ActiveMenuFooterDirective],
  bootstrap: [MainComponent],
  exports: [FooterComponent],
})
export class GatewayappestudosAppModule {}
