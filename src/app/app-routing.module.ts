import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './current-weather/current-weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//Routing
const appRoutes : Routes = [
  { path: '', component: SearchComponent },
  { path: 'error404', component: PageNotFoundComponent },
  //Wild card route
  { path: '**', redirectTo: '/error404', pathMatch: 'full' } 
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
