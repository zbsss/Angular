import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[] = Courses.courses;
  coursesChanged = new Subject<Course[]>();

  constructor(private http: HttpClient) { }

  getCourse(idd: string) {
    return this.courses.filter(c => c.idd === idd)[0];
  }
  getCourses() {
    return this.courses.slice();
  }
  existCourse(idd: string): boolean {
    let flag = false;
    this.courses.forEach(c => {
      if (c.idd === idd) {
        flag = true;
      }
    });
    return flag;
  }
  canJoin(idd: string): boolean {
    const courseToJoin = this.courses.find(c => c.idd === idd);
    return !(courseToJoin.maxStudents === courseToJoin.numberOfStudents);
  }
  deleteCourse(idd: string) {
    const courseToDelete = this.courses.find(c => c.idd === idd);
    const index = this.courses.indexOf(courseToDelete);
    this.courses.splice(index, 1);
    this.coursesChanged.next(this.courses.slice());
  }
  addCourse(name: string, ects: number, image: string, description: string, semester: number, formOfCourse: string, maxStudents: number) {
    const course: Course = {
      idd: (this.courses.length + 1).toString(),
      name,
      ects,
      image,
      description,
      semester,
      formOfCourse,
      maxStudents,
      grade: 0,
      numberOfStudents: 0,
      sumOfGrade: 0,
      numberOfVotes: 0

    };
    this.courses.push(course);
    this.coursesChanged.next(this.courses);
  }
  editCourse(idd: string, name: string, ects: number, image: string, description: string, semester: number, formOfCourse: string, maxStudents: number) {
    this.courses.map(course => {
      if (course.idd === idd) {
        course.name = name;
        course.ects = ects;
        course.image = image;
        course.description = description;
        course.semester = semester;
        course.formOfCourse = formOfCourse;
        course.maxStudents = maxStudents;
      }
    });
  }
  changeNumberOfStudents(idd: string) {
    this.courses.map(course => {
      if (course.idd === idd) {
        course.numberOfStudents++;
      }
    });
  }
  rateCourse(idd: string, rate: number) {
    this.courses.map(course => {
      if (course.idd === idd) {
        course.numberOfVotes++;
        course.sumOfGrade += rate;
        course.grade = +(( course.sumOfGrade / course.numberOfVotes).toFixed(2));
      }
    });
  }
}

export class Courses {
  static courses = [
    {
      idd: '0',
      name: 'Analiza matematyczna',
      ects: 6,
      image: 'https://vignette.wikia.nocookie.net/esgieha/images/6/60/Matematyka.jpg/revision/latest?cb=20180329161943&path-prefix=pl',
      description: 'W ramach zajęć student powinien opanować podstawy rachunku różniczkowego i całkowego funkcji jednej zmiennej.',
      semester: 1,
      formOfCourse: 'Wykład',
      maxStudents: 35,
      grade: 5,
      numberOfStudents: 35,
      sumOfGrade: 20,
      numberOfVotes: 4,

    },
    {
      idd: '1',
      name: 'Algebra liniowa',
      ects: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrA5YKjITRBmUIjgakcadDV40ibm9EiSaKyYQqd9ognPiXYSRbOw&s',
      description: 'Kurs obejmuje pojęcia takie jak liczby zespolone, relacje, struktury algebraiczne, macierz, itp.',
      semester: 1,
      formOfCourse: 'Ćwiczenia',
      maxStudents: 22,
      grade: 5,
      numberOfStudents: 15,
      sumOfGrade: 75,
      numberOfVotes: 15,

    },
    {
      idd: '2',
      name: 'Wprowadzenie do systemu UNIX',
      ects: 4,
      image: 'https://help.apple.com/assets/5D92A6940946227D4301035B/5D92A6A50946227D43010362/en_US/dfa4eabaceda47fa30991ecfd2c28d7c.png',
      description: 'Celem kursu jest wyposażenie studenta w umiejętność korzystania z systemu operacyjnego UNIX.',
      semester: 1,
      formOfCourse: 'Laboratoria',
      maxStudents: 16,
      grade: 4.5,
      numberOfStudents: 10,
      sumOfGrade: 18,
      numberOfVotes: 4,

    },
    {
      idd: '3',
      name: 'Wstęp do informatyki',
      ects: 6,
      image: 'http://wloclaweklokalnie.pl/photos/items/15_08/TN92VTHZMLKC_494_zapisz_sie_i_zdobadz_tytul_technik_informatyk_z_zak_wloclawek.jpg',
      description: 'Celem przedmiotu jest zapoznanie z podstawowymi pojęciami informatyki i programowaniem w języku proceduralnym.',
      semester: 1,
      formOfCourse: 'Ćwiczenia',
      maxStudents: 22,
      grade: 3,
      numberOfStudents: 16,
      sumOfGrade: 12,
      numberOfVotes: 4,

    },
    {
      idd: '4',
      name: 'Algorytmy i struktury danych',
      ects: 6,
      image: 'https://n4.sdlcdn.com/imgs/b/z/6/Introduction-To-Algorithms-Paperback-English-SDL474587042-1-8ecff.jpg',
      description: 'Przedmiot zapoznaje studentów z podstawowymi algorytmami, strukturami danych oraz metodami tworzenia algorytmów.',
      semester: 2,
      formOfCourse: 'Ćwiczenia',
      maxStudents: 22,
      grade: 2.2,
      numberOfStudents: 0,
      sumOfGrade: 11,
      numberOfVotes: 5,

    },
    {
      idd: '5',
      name: 'Fizyka',
      ects: 6,
      image: 'https://previews.123rf.com/images/gow27/gow271601/gow27160100108/50745250-physics-science-theory-law-and-mathematical-formula-equation-doodle-handwriting-and-model-icon-in-wh.jpg',
      description: 'Kurs obejmuje wiedzę dotyczącą mechaniki, kinematyki, dynamiki, termodynamiki i elektromagnetyzmu.',
      semester: 2,
      formOfCourse: 'Wykład',
      maxStudents: 30,
      grade: 3.83,
      numberOfStudents: 20,
      sumOfGrade: 23,
      numberOfVotes: 6,

    },
    {
      idd: '6',
      name: 'Podstawy baz danych',
      ects: 4,
      image: 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/09/what-is-a-database-management-system.png',
      description: 'Tematem kursu są podstawy teorii baz danych ze szczególnym uwzględnieniem modelu relacyjnego.',
      semester: 3,
      formOfCourse: 'Wykład',
      maxStudents: 30,
      grade: 1.33,
      numberOfStudents: 5,
      sumOfGrade: 8,
      numberOfVotes: 6,

    },
    {
      idd: '7',
      name: 'Programowanie obiektowe',
      ects: 3,
      image: 'https://www.unionsquaredesign.com/wp-content/uploads/2016/10/CPT-OOP-objects_and_classes_-_attmeth.svg.png',
      description: 'Celem zajęć jest zaznajomienie studentów z paradygmatem programowania obiektowego.',
      semester: 3,
      formOfCourse: 'Projekt',
      maxStudents: 15,
      grade: 3,
      numberOfStudents: 8,
      sumOfGrade: 15,
      numberOfVotes: 5,

    },
    {
      idd: '8',
      name: 'Programowanie funkcyjne',
      ects: 2,
      image: 'data:image/jpeg;base64,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',
      description: 'Kurs kładzie nacisk na zasady, techniki i wzorce programowania funkcyjnego, które są uniwersalne.',
      semester: 3,
      formOfCourse: 'Laboratoria',
      maxStudents: 18,
      grade: 4.8,
      numberOfStudents: 16,
      sumOfGrade: 24,
      numberOfVotes: 5,

    },
    {
      idd: '9',
      name: 'Wprowadzenie do aplikacji internetowych',
      ects: 3,
      image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/99178782/original/24b79181371fc099fb8eaa7fe5c030f2c1cb23fb/write-php-mysql-html-css-js-bootstrap-codes-for-you.png',
      description: 'Celem modułu jest nabycie umiejętności tworzenia aplikacji webowych w oparciu o technologie HTML5, CSS2 i JavaScript.',
      semester: 3,
      formOfCourse: 'Projekt',
      maxStudents: 15,
      grade: 5,
      numberOfStudents: 10,
      sumOfGrade: 20,
      numberOfVotes: 4,

    }
  ];
}
