import { Component, Input, input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { LessonComponent } from "../lesson/lesson.component";
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../directives/tooltip.directive';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatIcon, LessonComponent, MatButtonModule,RouterLink, TooltipDirective],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
   courseId!: number

   userId!:number
  course!: Course
  teacher!:User

  constructor(private courseService: CourseService, 
    private activatedRoute: ActivatedRoute,private userService:UserService,private cookieService:CookieService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId =Number(params.get('id'));
    });
    this.init();
    this.userId = Number(this.cookieService.get("id"));
  }
  init(){
    this.courseService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data
      console.log(this.course);
      
      this.userService.getUserById(this.course.teacherId).subscribe((data) => {
        this.teacher = data
        console.log(this.teacher);
        
      });
    });

  }

  enroll(){

console.log(this.userId);
    
    this.courseService.enroll(this.course.id, this.userId).subscribe(data=>{
      console.log(data);
      
    })

  }
  unenroll(){
const id = this.cookieService.get("id");

console.log(this.userId);

    this.courseService.unenroll(this.course.id, this.userId).subscribe(data=>{
      console.log(data);
      
      
    })
  }

  deleteCourse(){
    
    this.courseService.deleteCourse(this.courseId)
  }


  
}
