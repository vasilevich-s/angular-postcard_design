import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostcardComponent } from './postcard/postcard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: PostcardComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
