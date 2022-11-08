import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  {path: 'rules', component: RulesComponent, pathMatch: 'full'},
  {path: 'play', component: PlayComponent, pathMatch: 'full'},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }