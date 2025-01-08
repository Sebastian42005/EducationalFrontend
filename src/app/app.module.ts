import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginComponent} from './dialogs/login/login.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputComponent} from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from './components/button/button.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";
import {Select2Component} from './components/select2/select2.component';
import {HttpClientModule} from "@angular/common/http";
import {PopupInfoComponent} from './components/popup-info/popup-info.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {CreateSubjectDialogComponent} from './dialogs/create-subject-dialog/create-subject-dialog.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {MatButtonModule} from "@angular/material/button";
import {SubjectComponent} from './pages/subject/subject.component';
import {MatListModule} from "@angular/material/list";
import {CreateLessonDialogComponent} from './dialogs/create-lesson-dialog/create-lesson-dialog.component';
import {MatMenuModule} from "@angular/material/menu";
import {FileComponent} from './components/file/file.component';
import {LessonComponent} from './pages/lesson/lesson.component';
import {AdminUserComponent} from "./pages/admin/admin-user/admin-user.component";
import {AdminSubjectsComponent} from "./pages/admin/admin-subjects/admin-subjects.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckbox} from "@angular/material/checkbox";
import {AdminUserEditComponent} from "./pages/admin/admin-user/admin-user-edit/admin-user-edit.component";
import {ProfileImageComponent} from "./components/profile-image/profile-image.component";
import {AdminSubjectEditComponent} from "./pages/admin/admin-subjects/admin-subject-edit/admin-subject-edit.component";
import {WorkshopComponent} from "./pages/workshop/workshop.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TextAreaComponent} from "./components/text-area/text-area.component";
import {AdminWorkshopComponent} from "./pages/admin/admin-workshop/admin-workshop.component";
import {MatSortModule} from "@angular/material/sort";
import {RolePipe} from "./pipe/role.pipe";
import {UserListComponent} from "./chat/user-list/user-list.component";
import {ChatComponent} from "./chat/chat.component";
import {UserInfoComponent} from "./chat/user-info/user-info.component";
import {MessageListComponent} from "./chat/message-list/message-list.component";
import { BookWorkshopComponent } from './pages/workshop/book-workshop/book-workshop.component';
import { WorkshopChatComponent } from './pages/workshop/workshop-chat/workshop-chat.component';
import { ChangeWorkshopStateDialogComponent } from './dialogs/change-workshop-state-dialog/change-workshop-state-dialog.component';
import {AdminLessonEditComponent} from "./pages/admin/admin-lessons/admin-lesson-edit/admin-lesson-edit.component";

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
        AdminUserComponent,
        AdminSubjectsComponent,
        SubjectComponent,
        CreateLessonDialogComponent,
        FileComponent,
        LessonComponent,
        AdminUserEditComponent,
        AdminSubjectEditComponent,
        WorkshopComponent,
        TextAreaComponent,
        AdminWorkshopComponent,
        UserListComponent,
        ChatComponent,
        UserInfoComponent,
        MessageListComponent,
        BookWorkshopComponent,
        WorkshopChatComponent,
        ChangeWorkshopStateDialogComponent,
        AdminLessonEditComponent
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
        MatTableModule,
        MatPaginatorModule,
        MatCheckbox,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        ProfileImageComponent,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSortModule,
        RolePipe,
    ],
    providers: [],
    exports: [
        SubjectComponent,
        CreateSubjectDialogComponent,
        InputComponent,
        SelectComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
