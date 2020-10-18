import { ComicComponent } from './comic/comic.component';
import { CharacterComponent } from './character/character.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {path: '', redirectTo: '/characters', pathMatch: 'full'},
    {
      path: 'characters', component: CharacterComponent
    },
    {
      path: 'comics', component: ComicComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
