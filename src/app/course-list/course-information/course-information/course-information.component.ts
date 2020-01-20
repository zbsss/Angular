import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/my-courses/user.service';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit {
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.pipe(map(params => params['idd'])).subscribe(idd => {
      this.course = this.courseService.getCourse(idd);
    });
  }
  joinCourse() {
    if (!this.userService.courseService.canJoin(this.course.idd)) { window.alert('Niestety nie ma już miejsc na ten kurs'); } else { this.userService.joinCourse(this.course.idd); }
  }

}
