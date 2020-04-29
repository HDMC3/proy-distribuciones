import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistribucionesComponent } from './componentes/distribuciones/distribuciones.component';
import { HomeComponent } from './componentes/home/home.component';
import { ColasComponent } from './componentes/colas/colas.component';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'distri', component: DistribucionesComponent },
    { path: 'colas', component: ColasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
