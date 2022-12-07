import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Course } from "../model/course.model";
import { Observable } from "rxjs";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:3000/courses');
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>('http://localhost:3000/courses', course);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/courses/' + courseId);
  }

  updateCourse(courseId: string | number, changes: Partial<Course>): Observable<any> {
    return this.http.put('http://localhost:3000/courses/' + courseId, changes);
  }
}