import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


//Routing
const appRoutes : Routes = [
  { path : '', component : SearchComponent},
  { path : '**', component : PageNotFoundComponent }    // Wildcard route for a 404 page
] //TODO : wildcard not working

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
