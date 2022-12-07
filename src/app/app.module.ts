import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseModule } from './course/course.module';
import { CoursesListComponent } from './course/components/courses-list/courses-list.component';
import { CreateCourseComponent } from './course/components/create-course/create-course.component';
import { EffectsModule } from '@ngrx/effects';
import { CourseResolver } from './course/course.resolver';

export const routes: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    resolve: {
      courses: CourseResolver
    }
  },
  {
    path: 'create-course',
    component: CreateCourseComponent
  },
  {
    path: '**',
    redirectTo: 'courses'
  }
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CourseModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [CourseResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
