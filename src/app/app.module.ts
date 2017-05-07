import { AuthProvider } from './../providers/AuthProvider';
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
import { LocationAccuracy } from "@ionic-native/location-accuracy";
import { Http, HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage/es2015";
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
    IonicModule.forRoot(MyApp),HttpModule,
    IonicStorageModule.forRoot()
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
    Transfer, Camera, LocationAccuracy, AuthProvider
  ]
})
export class AppModule {}
