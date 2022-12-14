import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, Observable, tap } from "rxjs";
import { AppState } from "../store/reducers";
import { coursesLoaded, loadCourses } from "./store/course.actions";
import { areCoursesLoaded } from "./store/course.selectors";

@Injectable()
export class CourseResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap(coursesLoaded => {
        if (!coursesLoaded) {
          this.store.dispatch(loadCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first()
    );
  }
}