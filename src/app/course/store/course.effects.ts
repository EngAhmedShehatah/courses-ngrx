import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { CourseService } from "../services/course.service";
import { courseActionTypes } from "./course.actions";

@Injectable()
export class CourseEffects {

  constructor(
    private courseService: CourseService,
    private actions$: Actions,
    private router: Router
  ) { }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.loadCourses),
      concatMap(() => this.courseService.getAllCourses()),
      map(courses => courseActionTypes.coursesLoaded({ courses }))
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.createCourse),
      concatMap(action => this.courseService.createCourse(action.course)),
      tap(() => this.router.navigateByUrl('/courses'))
    ),
    { dispatch: false }
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap(action => this.courseService.updateCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.deleteCourse),
      concatMap(action => this.courseService.deleteCourse(action.courseId))
    ),
    { dispatch: false }
  );

}