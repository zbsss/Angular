import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {
  courses: Course[];
  subscription: Subscription;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.subscription = this.courseService.coursesChanged.subscribe(courses => {
      this.courses = courses;
    });
    this.courses = this.courseService.getCourses();
  }
  remove(idd) {
    this.courseService.deleteCourse(idd);
  }

}
