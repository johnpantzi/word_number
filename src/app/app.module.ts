import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';

const appRoutes: Routes = [
  { path: 'rules', component: RulesComponent },
  { path: 'play', component:PlayComponent},
  { path: '', component: AppComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    HomeComponent,
    PlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RulesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }