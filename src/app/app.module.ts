import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list.component';
import { AppData } from './app-data';
import { MaterialModule } from 'src/material-module';
import { PostsForUserComponent } from './posts-for-user/posts-for-user.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostsForUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(AppData),
    AppRoutingModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
