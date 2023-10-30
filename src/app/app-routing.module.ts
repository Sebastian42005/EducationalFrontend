import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginComponent} from "./dialogs/login/login.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {SubjectComponent} from "./pages/subject/subject.component";
import {LessonComponent} from "./pages/lesson/lesson.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'lesson/:id', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
