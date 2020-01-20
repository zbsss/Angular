import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/course-list/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courses: Course[];
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

}
