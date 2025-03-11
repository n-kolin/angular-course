import { Routes } from '@angular/router';
import { CourseComponent } from '../components/course/course.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { FormComponent } from '../components/form/form.component';
import { HomeComponent } from '../components/home/home.component';
import { MenuComponent } from '../components/menu/menu.component';

export const routes: Routes = [

    {path:'', component:HomeComponent },

    {path:'course/stud/:studId', component:CourseComponent},
    {path:'course', component:CourseComponent,children:[
        
    ]},
    {path:'course/:id', component:CourseDetailsComponent,},
    
  { path: ':mode/crs/:courseId', component: FormComponent },
  { path: ':mode/crs', component: FormComponent }, 

  { path: ':mode/crs/:courseId/lsn/:lessonId', component: FormComponent },
  { path: ':mode/crs/:courseId/lsn', component: FormComponent }, 

];
