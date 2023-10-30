import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './dialogs/login/login.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import { ButtonComponent } from './components/button/button.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { SelectComponent } from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";
import { Select2Component } from './components/select2/select2.component';
import {HttpClientModule} from "@angular/common/http";
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { CreateSubjectDialogComponent } from './dialogs/create-subject-dialog/create-subject-dialog.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {MatButtonModule} from "@angular/material/button";
import { SubjectComponent } from './pages/subject/subject.component';
import {MatListModule} from "@angular/material/list";
import { CreateLessonDialogComponent } from './dialogs/create-lesson-dialog/create-lesson-dialog.component';
import {MatMenuModule} from "@angular/material/menu";
import { FileComponent } from './components/file/file.component';
import { LessonComponent } from './pages/lesson/lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    Select2Component,
    PopupInfoComponent,
    DropdownMenuComponent,
    CreateSubjectDialogComponent,
    LandingPageComponent,
    SubjectComponent,
    CreateLessonDialogComponent,
    FileComponent,
    LessonComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTabsModule,
        MatDialogModule,
        MatInputModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
