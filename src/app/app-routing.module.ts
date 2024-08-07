import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginComponent} from "./dialogs/login/login.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {SubjectComponent} from "./pages/subject/subject.component";
import {LessonComponent} from "./pages/lesson/lesson.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {AdminUserEditComponent} from "./pages/admin/admin-user/admin-user-edit/admin-user-edit.component";
import {AdminSubjectEditComponent} from "./pages/admin/admin-subjects/admin-subject-edit/admin-subject-edit.component";
import {WorkshopComponent} from "./pages/workshop/workshop.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'workshop', component: WorkshopComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'lesson/:id', component: LessonComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/user/:id', component: AdminUserEditComponent },
  { path: 'admin/subject/:id', component: AdminSubjectEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
