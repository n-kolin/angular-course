import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCard } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCard,
    NgClass, MatIcon, CourseDetailsComponent,MatButtonModule, RouterLink
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  studentId: number = 0
  all: boolean = true
  details = 0
  courses!: Course[]
  constructor(private courseService: CourseService,
    private activatedRoute:ActivatedRoute
  ) { }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      const studId = params.get('studId');
      if(studId==='all')
      {
        this.all = true;
      }
      else{
        this.all = false;
        this.studentId = Number(studId);
        console.log(this.studentId);
        
      }
    });


    if (!this.all) {
      this.courseService.getCoursesByStudentId(this.studentId).subscribe((data) => {
        this.courses = data
      });
    } else {

      this.courseService.courses$.subscribe((data) => {
        this.courses = data
      });
      this.courseService.getCourses()
    }

  }


  enroll(id: number) {

    this.courseService.enroll(id, this.studentId).subscribe(data => {
      console.log(data)
    
    console.log('enroll', id, this.studentId);
    this.courseService.getCoursesByStudentId(this.studentId).subscribe((data) => {
      this.courses = data
    });
  })
  }

  leave(id: number) {
    console.log('unenroll', id, this.studentId);

    this.courseService.unenroll(id, this.studentId).subscribe(data => 
      {console.log(data)
      this.courseService.getCoursesByStudentId(this.studentId).subscribe((data) => {
        this.courses = data
      });
    }
    )


  }



}








