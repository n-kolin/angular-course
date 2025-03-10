import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = "http://localhost:3000/api/courses"

  private LessonsSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.LessonsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLessonsInCourse(courseId:number) {
    this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`).subscribe(data => {
      this.LessonsSubject.next(data);
    });

  }
  getLessonById(courseId: number, lessonId: number): Observable<Lesson> {

    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }

  addLesson(lesson: Lesson) {

    this.http.post(`${this.baseUrl}/${lesson.courseId}/lessons`,
      {
        "title": lesson.title,
        "content": lesson.content,
        "courseId": lesson.courseId
      }).subscribe(() => {
        this.getLessonsInCourse(lesson.courseId);
      })
  }
  updateLesson(courseId:number, lessonId:number, lesson: Lesson) {

    this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`,
      {
        "title": lesson.title,
        "content": lesson.content,
        "courseId": lesson.courseId
      }).subscribe(() => {
        this.getLessonsInCourse(lesson.courseId);
        this.getLessonsInCourse(courseId);//האם לעדכן ל 2 הקורסים?...
      })
  }

  
  deleteLesson(courseId: number, lessonId:number):Observable<any> {

    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`)
  }
}
