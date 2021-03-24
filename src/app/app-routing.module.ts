import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsForUserComponent } from './posts-for-user/posts-for-user.component';
import { PostListComponent } from './posts/post-list.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/user', component: PostsForUserComponent},
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
