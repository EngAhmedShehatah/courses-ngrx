import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Course } from '../../model/course.model';
import { CourseService } from '../../services/course.service';
import { courseActionTypes } from '../../store/course.actions';
import { getAllCourses } from '../../store/course.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;
  courseToBeUpdated: Course;
  isUpdateActivated = false;

  constructor(
    private courseService: CourseService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.courses$ = this.store.select(getAllCourses);
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm: NgForm) {
    const update: Update<Course> = {
      id: this.courseToBeUpdated!.id,
      changes: {
        ...this.courseToBeUpdated,
        ...updateForm.value
      }
    };
    this.store.dispatch(courseActionTypes.updateCourse({update}));

    this.courseToBeUpdated = null;
    this.isUpdateActivated = false;
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(courseActionTypes.deleteCourse({courseId}));
  }

}
