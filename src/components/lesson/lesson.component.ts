import { Component, Input } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { Course } from '../../models/course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { LessonService } from '../../services/lesson.service';
import { Observable } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';


@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [MatList, MatListItem,
    MatCard, MatCardHeader, MatCardContent, MatCardActions,
    MatIcon, MatMenu, MatMenuTrigger, MatMenuItem,MatIconButton,
    RouterLink
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  constructor(private route: ActivatedRoute, private lessonService: LessonService) { }

  @Input() courseId!: number
  course!: Course


  lessons!: Lesson[];

  ngOnInit(): void {


    this.lessonService.getLessonsInCourse(Number(this.courseId))
    this.lessonService.lessons$.subscribe((data) => {
      this.lessons = data
    });

  }

  
  deleteLesson(id:number){

    this.lessonService.deleteLesson(this.courseId, id).subscribe(()=>{
      this.lessonService.getLessonsInCourse(Number(this.courseId))

    })
  }


}
