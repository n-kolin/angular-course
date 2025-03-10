import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { AuthComponent } from '../components/auth/auth.component';
import { CourseComponent } from '../components/course/course.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { FormComponent } from '../components/form/form.component';
import { HomeComponent } from '../components/home/home.component';
import { MenuComponent } from '../components/menu/menu.component';

export const routes: Routes = [
    {path:'user/:id', component:UserComponent},

    {path:'', component:HomeComponent },

    // {path:'', component:MenuComponent }, 
    {path:'auth', component:AuthComponent},
    {path:'connect/:status', component:UserComponent},
    // {path:'auth/:id', component:UserComponent},
    {path:'course', component:CourseComponent,children:[
        
    ]},
    {path:'course/:id', component:CourseDetailsComponent,},
    // {path:'course/:courseId/ls/:lessonId', component:LessonFormComponent,},
    // {path:'lesson/:id', component:LessonComponent},

    // ניתוב לעריכת או הוספת קורס
  { path: ':mode/crs/:courseId', component: FormComponent },
  { path: ':mode/crs', component: FormComponent }, // הוספת קורס חדש (ללא courseId)

  // ניתוב לעריכת או הוספת שיעור
  { path: ':mode/crs/:courseId/lsn/:lessonId', component: FormComponent }, // עריכת שיעור קיים
  { path: ':mode/crs/:courseId/lsn', component: FormComponent }, // הוספת שיעור חדש (ללא lessonId)

];
