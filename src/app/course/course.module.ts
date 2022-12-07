import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from './services/course.service';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './store/course.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';


@NgModule({
  declarations: [
    CreateCourseComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('courses', courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
