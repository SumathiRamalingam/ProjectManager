import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { MenuComponent } from './menu/menu.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import {PMUserService} from './services/pmuser.service';
import { SearchPipe } from './search.pipe';
import { UpdateTaskComponent } from './update-task/update-task.component';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    MenuComponent,
    ViewTaskComponent,
    SearchPipe,
    UpdateTaskComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PMUserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
