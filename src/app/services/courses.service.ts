import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CourseForm } from "@app/shared/models/course.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  public constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.apiUrl;

  getAll() {
    return this.httpClient.get<any>(`${this.baseUrl}/courses/all`);
  }

  createCourse(course: CourseForm) {
    return this.httpClient.post<any>(`${this.baseUrl}/courses/add`, course);
  }

  editCourse(id: string, course: CourseForm) {
    return this.httpClient.put<any>(`${this.baseUrl}/courses/${id}`, course);
  }

  getCourse(id: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/courses/${id}`);
  }

  deleteCourse(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/courses/${id}`);
  }

  filterCourses(value: string) {
    const params = new HttpParams().set("title", value);
    return this.httpClient.get<any>(`${this.baseUrl}/courses/filter`, {
      params: params,
    });
  }

  getAllAuthors() {
    return this.httpClient.get<any>(`${this.baseUrl}/authors/all`);
  }

  createAuthor(name: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/authors/add`, {
      name,
    });
  }

  getAuthorById(id: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/authors/${id}`);
  }

  deleteAuthor(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/authors/${id}`);
  }
}
