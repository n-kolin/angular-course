// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-lesson-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './lesson-form.component.html',
//   styleUrl: './lesson-form.component.css'
// })
// export class LessonFormComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LessonService } from '../../services/lesson.service';
import { NgTemplateOutlet } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../services/course.service';


@Component({
  selector: 'app-form',
    standalone: true,
    imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, ReactiveFormsModule,NgTemplateOutlet,
  RouterLink],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
    lessonForm: FormGroup;
    courseForm: FormGroup;
    isEdit: boolean = false;
    isOpen: boolean = true;
    courseId!: number;
    lessonId!: number;
    mode!:string | null
    isLesson = false // lesson / course
    
    


    constructor(
        private fb: FormBuilder,
        private lessonService: LessonService,
        private courseService:CourseService,
        // public dialogRef: MatDialogRef<LessonFormComponent>,
        private activatedRoute: ActivatedRoute,
        private router:Router
    ) {
        this.lessonForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            courseId: [null, [Validators.required, Validators.min(1)]],
        });
        this.courseForm = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          teacherId: [null, [Validators.required, Validators.min(1)]],
      });
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.courseId = Number(params.get('courseId'));
            this.lessonId = Number(params.get('lessonId'));
            this.mode = params.get('mode');
            if (this.mode==='edit') {
                this.isEdit = true;
                if(this.lessonId){ //edit lesson
              this.isLesson = true;

                  this.loadLesson(this.courseId, this.lessonId);
                }
                else if(this.courseId) // edit course
                  this.loadCourse(this.courseId);

            }
            else if(this.courseId) // add lesson
              this.isLesson = true;
              //else - add course
        });
    }

    loadLesson(cId: number, lId:number) {
        this.lessonService.getLessonById(cId, lId).subscribe(lesson => {
            this.lessonForm.patchValue(lesson);
        });
    }
    loadCourse(cId: number) {
      this.courseService.getCourseById(cId).subscribe(course => {
          this.courseForm.patchValue(course);
      });
  }

    onSubmit() {

      console.log('lesson?',this.isLesson,'edit?',this.isEdit);
      
      if(this.isLesson){
        if (this.isEdit) {
            this.lessonService.updateLesson(this.courseId, this.lessonId,this.lessonForm.value)//.subscribe(() => {
            //     this.dialogRef.close();
            // });
        } else {
            this.lessonService.addLesson(this.lessonForm.value)//.subscribe(() => {
            //     this.dialogRef.close();
            // });
        }
      }
      else {
        if(this.isEdit){
          this.courseService.updateCourse(this.courseId,this.courseForm.value)
        }
        else{
          this.courseService.addCourse(this.courseForm.value)
          console.log('add course', this.courseForm.value, this.lessonForm.value);
          
        }
      }
      this.router.navigateByUrl(`/course${this.isLesson?`/${this.courseId}`:''}`);

    }


    openDialog() {
        this.isOpen = true;
    }
    closeDialog(){
      this.isOpen = false;
    }
}

