import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CourseService } from '../course-list/course.service';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    email: '',
    courses: [],
    coursesVoted: []
  };
  coursesChanged = new Subject<Course[]>();
  constructor(public router: Router, public authService: AuthService, public courseService: CourseService) { 
    this.user.email = authService.getUser().email;
  }
  getCourses() {
    this.user.courses.forEach(c => {
      if (!this.courseService.existCourse(c.idd)) {
        this.deleteCourse(c.idd);
      }
    });
    return this.user.courses.slice();
  }
  deleteCourse(idd: string) {
    const courseToDelete = this.user.courses.find(c => c.idd === idd);
    const index = this.user.courses.indexOf(courseToDelete);
    this.user.courses.splice(index, 1);
    this.coursesChanged.next(this.user.courses.slice());
  }
  haveCourses(): boolean {
    return !(this.user.courses.length === 0);
  }
  joinCourse(idd: string) {
    let flag = true;
    this.user.courses.forEach(c => {
      if (c.idd === idd) {
        flag = false;
      }
    });
    if (flag && this.courseService.canJoin(idd)) {
      this.user.courses.push(this.courseService.getCourse(idd));
      this.courseService.changeNumberOfStudents(idd);
    }

    console.log(this.user.courses);
  }
  canRateCourse(idd: string): boolean {
    let flag = true;
    this.user.coursesVoted.forEach(c => {
      if (c.idd === idd) {
        flag = false;
      }
    });
    return flag;
  }
  rateCourse(idd: string) {
    this.user.coursesVoted.push(this.courseService.getCourse(idd));
  }
}
