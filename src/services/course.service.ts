import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = "http://localhost:3000/api/courses"

  private CoursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public courses$ = this.CoursesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCourses() {

    this.http.get<Course[]>(this.baseUrl).subscribe(data => {
      this.CoursesSubject.next(data);
    });

  }
  getCourseById(id: number): Observable<Course> {

    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  getCoursesByStudentId(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`);
  }
  enroll(courseId: number, studntId: number):Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/enroll`, {
      body: {
         "userId": studntId
      }
    })
    
  }
  unenroll(courseId: number, studntId: number) :Observable<any>{
    return this.http.delete(`${this.baseUrl}/${courseId}/unenroll`, {
      body: {
        "userId": studntId
      }
    })
  }
  addCourse(course: Course) {

    this.http.post(this.baseUrl,
      {
        "title": course.title,
        "description": course.description,
        "teacherId": course.teacherId
      }).subscribe(() => {
        this.getCourses();
      })
  }

  updateCourse(id: number, course: Course) {

    this.http.put(`${this.baseUrl}/${id}`,
      {
        "title": course.title,
        "description": course.description,
        "teacherId": course.teacherId
      }).subscribe(() => {
        this.getCourses();
      })
  }
  deleteCourse(id: number) {

    this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      this.getCourses();
    })
  }
}
