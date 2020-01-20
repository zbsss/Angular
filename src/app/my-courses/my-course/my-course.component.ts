import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course-list/course.service';
import { UserService } from '../user.service';
import { Course } from 'src/app/models/course.model';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  @Input() idd: string;
  @Input() image: string;
  @Input() name: string;
  @Input() description: string;
  @Input() ects: number;
  @Input() formOfCourse: string;
  @Input() grade: number;
  @Input() semester: number;
  sumOfGrade: number;
  numberOfVotes: number;
  course: Course;
  vote: boolean;
  user: User;
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private userService: UserService) { }
  ngOnInit() {
    this.course = this.courseService.getCourse(this.idd);
    this.vote = !this.userService.canRateCourse(this.idd);
    this.user = this.userService.user;
  }
  rateCourse(id: number) {
    if (this.userService.canRateCourse(this.idd)) {
      this.vote = true;
      this.userService.rateCourse(this.idd);
      this.courseService.rateCourse(this.idd, id);
      this.sumOfGrade = this.course.sumOfGrade;
      this.numberOfVotes = this.course.numberOfVotes;
      this.grade = this.course.grade;
    } else {
      window.alert('Możesz ocenić kurs tylko raz');
    }
  }
}
