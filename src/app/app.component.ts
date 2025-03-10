import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CourseComponent } from "../components/course/course.component";
import { CourseDetailsComponent } from "../components/course-details/course-details.component";
import { LessonComponent } from "../components/lesson/lesson.component";
import { HomeComponent } from "../components/home/home.component";
import { CookieService } from 'ngx-cookie-service';
import { MenuComponent } from "../components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CourseComponent, CourseDetailsComponent, LessonComponent,
    MatButtonModule,
    MatToolbarModule,
    RouterLink, HomeComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-online-courses';
  
}
