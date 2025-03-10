import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CourseComponent } from "../course/course.component";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AsyncPipe,
    MatToolbar,RouterLink,
    MatButton, CourseComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService:UserService, private courseService:CourseService,
    private cookieService:CookieService

  ) { }

  studentId!: number
  user!:User
  choose=1;
  // myCourses!:Course[]
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.studentId = Number(id);
      }
      // else {
      //   console.error('Product ID not found');
      // }
    });
    this.userService.getUserById(this.studentId).subscribe((data) => {
      this.user = data
    })
    // this.courseService.getCoursesByStudentId(this.studentId).subscribe((data) => {
    //   this.myCourses = data
    // })
  }

  logOut(){
  
    this.cookieService.delete("accessToken");
   

  }

}



