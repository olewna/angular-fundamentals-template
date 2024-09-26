import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  public constructor(private httpClient: HttpClient) {}
  getAll() {
    this.httpClient.get<any>(`https://localhost:4000/courses/all`);
  }

  createCourse(course: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  editCourse(id: string, course: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  getCourse(id: string) {
    // Add your code here
  }

  deleteCourse(id: string) {
    // Add your code here
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    // Add your code here
  }

  createAuthor(name: string) {
    // Add your code here
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
