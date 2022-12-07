import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Course } from '../../model/course.model';
import { courseActionTypes } from '../../store/course.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: NgForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const course: Course = {
      id: '0',
      name: submittedForm.value.name,
      description: submittedForm.value.description
    };

    this.store.dispatch(courseActionTypes.createCourse({ course }));
  }

}
