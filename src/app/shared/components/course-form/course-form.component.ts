import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author } from "@app/shared/models/author.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private location: Location,
    private coursesStoreService: CoursesStoreService,
    private router: Router,
    private coursesFacade: CoursesStateFacade
  ) {
    library.addIconPacks(fas);
  }

  protected courseForm!: FormGroup;
  protected submitted = false;
  protected id = "";
  private authors: Author[] = [];

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: [
        "",
        [Validators.pattern("^[A-Za-z0-9]+$"), Validators.minLength(2)],
      ],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: ["", [Validators.required, Validators.min(0)]],
    });

    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.authors$.subscribe({
      next: (authors) => {
        this.authors = authors;
      },
    });

    this.id = this.route.snapshot.params["id"];

    this.getAuthors().clear();

    this.authors.forEach((author) => {
      this.getAuthors().push(this.fb.control(author));
    });

    if (this.id) {
      this.coursesFacade.getSingleCourse(this.id);
      this.coursesFacade.course$.subscribe({
        next: (currentCourse) => {
          this.courseForm.patchValue({
            title: currentCourse!.title,
            description: currentCourse!.description,
            duration: currentCourse!.duration,
          });

          this.getCourseAuthors().clear();

          const courseAuthors = currentCourse!.authors.map((authorId) => {
            return {
              name: this.authors.filter((x) => x.id === authorId)[0]?.name,
              id: authorId,
            };
          });

          this.authors = [
            ...this.authors.filter(
              (x) => !currentCourse!.authors.includes(x.id)
            ),
          ];

          this.getAuthors().clear();

          this.authors.forEach((author) => {
            this.getAuthors().push(this.fb.control(author));
          });

          courseAuthors.forEach((author) => {
            this.getCourseAuthors().push(this.fb.control(author));
          });
        },
      });
    }
  }

  protected getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  protected getCourseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  protected createNewAuthor(): void {
    if (this.courseForm.controls["author"].value === "") {
      alert("Do not add empty");
    } else {
      this.coursesStoreService
        .createAuthor(this.courseForm.get("author")?.value)
        .subscribe({
          next: (res) => {
            this.getAuthors().push(this.fb.control(res.result));
          },
        });

      this.courseForm.controls["author"].setValue("");
    }
  }

  protected addToCourseAuthors(id: number) {
    const author = this.getAuthors().at(id);
    this.getCourseAuthors().push(author);
    this.getAuthors().removeAt(id);
  }

  protected removeFromCourseAuthors(id: number) {
    const author = this.getCourseAuthors().at(id);
    this.getAuthors().push(author);
    this.getCourseAuthors().removeAt(id);
  }

  protected deleteAuthor(i: number, id: string) {
    this.getAuthors().removeAt(i);

    this.coursesStoreService.deleteAuthor(id);
  }

  protected submit() {
    // console.log(this.courseForm);
    this.submitted = true;

    if (!this.courseForm.invalid) {
      const body = {
        title: this.courseForm.get("title")?.value,
        description: this.courseForm.get("description")?.value,
        duration: this.courseForm.get("duration")?.value,
        authors: this.getCourseAuthors().value.map(
          (x: Author) => x.id
        ) as string[],
      };

      if (this.id) {
        this.coursesFacade.editCourse(body, this.id);
      } else {
        this.coursesFacade.createCourse(body);
        this.courseForm.reset();
      }

      // alert(this.id ? "Updated" : "Course added"); //TODO
      // this.router.navigate(["courses"]);
    }
  }

  goBack() {
    this.location.back();
  }
}
