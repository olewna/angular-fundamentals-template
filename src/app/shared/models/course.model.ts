import { Author } from "./author.model";

export interface Course {
  id: string;
  creationDate: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface CourseForm {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}
