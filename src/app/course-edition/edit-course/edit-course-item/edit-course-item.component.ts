import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/course-list/course.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-course-item',
  templateUrl: './edit-course-item.component.html',
  styleUrls: ['./edit-course-item.component.css']
})
export class EditCourseItemComponent implements OnInit {
  courseForm: FormGroup;
  course: Course;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  private initForm() {
    const name: string = this.course.name;
    const ects: number = this.course.ects;
    const image: string = this.course.image;
    const description: string = this.course.description;
    const semester: number = this.course.semester;
    const formOfCourse: string = this.course.formOfCourse;
    const maxStudents: number = this.course.maxStudents;

    this.courseForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      ects: new FormControl(ects, Validators.required),
      image: new FormControl(image, Validators.required),
      description: new FormControl(description, Validators.required),
      semester: new FormControl(semester, Validators.required),
      formOfCourse: new FormControl(formOfCourse, Validators.required),
      maxStudents: new FormControl(maxStudents, Validators.required),
    });
  }
  ngOnInit() {
    this.route.params.pipe(map(params => params['idd'])).subscribe(idd => {
      this.course = this.courseService.getCourse(idd);
    });
    this.initForm();
  }
  onSubmit() {
    const idd: string = this.course.idd;
    const name: string = this.courseForm.value.name;
    const ects: number = this.courseForm.value.ects;
    const image: string = this.courseForm.value.image;
    const description: string = this.courseForm.value.description;
    const semester: number = this.courseForm.value.semester;
    const formOfCourse: string = this.courseForm.value.formOfCourse;
    const maxStudents: number = this.courseForm.value.maxStudents;
    this.courseService.editCourse(idd, name, ects, image, description, semester, formOfCourse, maxStudents);
    this.router.navigate(['/courses']);
  }

}
