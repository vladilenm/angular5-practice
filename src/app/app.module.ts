import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    SystemModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
