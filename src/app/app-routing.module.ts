import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginComponent} from "./dialogs/login/login.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {SubjectComponent} from "./pages/subject/subject.component";
import {LessonComponent} from "./pages/lesson/lesson.component";
import {AdminUserEditComponent} from "./pages/admin/admin-user/admin-user-edit/admin-user-edit.component";
import {AdminSubjectEditComponent} from "./pages/admin/admin-subjects/admin-subject-edit/admin-subject-edit.component";
import {WorkshopComponent} from "./pages/workshop/workshop.component";
import {AdminUserComponent} from "./pages/admin/admin-user/admin-user.component";
import {AdminSubjectsComponent} from "./pages/admin/admin-subjects/admin-subjects.component";
import {ChatComponent} from "./chat/chat.component";
import {BookWorkshopComponent} from "./pages/workshop/book-workshop/book-workshop.component";
import {WorkshopChatComponent} from "./pages/workshop/workshop-chat/workshop-chat.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: LandingPageComponent},
    {path: 'workshop', component: WorkshopComponent},
    {path: 'workshop/book', component: BookWorkshopComponent},
    {path: 'workshop/:id', component: WorkshopChatComponent},
    {path: 'subject/:id', component: SubjectComponent},
    {path: 'lesson/:id', component: LessonComponent},
    {path: 'admin/user/:id', component: AdminUserEditComponent},
    {path: 'admin/user', component: AdminUserComponent},
    {path: 'admin/subject', component: AdminSubjectsComponent},
    {path: 'admin/subject/:id', component: SubjectComponent},
    {path: 'admin/subject/:id/edit', component: AdminSubjectEditComponent},
    {path: 'admin/workshop', component: ChatComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
