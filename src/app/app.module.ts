import { CommentModal } from './../components/shared/comment-modal/comment-modal';
import { FilterModal } from './../components/shared/filter-modal/filter-modal';
import { IssuesListPage } from './../pages/issues_list/issues_list';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreateIssuePage } from "../pages/new_issue/new_issue";
import { Camera } from "@ionic-native/camera";
import { Transfer } from "@ionic-native/transfer";
import {Geolocation} from '@ionic-native/geolocation';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    IssuesListPage,
    FilterModal,
    CommentModal,
    CreateIssuePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    IssuesListPage,
    FilterModal,
    CommentModal,
    CreateIssuePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Transfer, Camera, Geolocation
  ]
})
export class AppModule {}
