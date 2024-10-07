import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText: string | undefined;
  @Input() iconName: any;
  @Input() reversed: boolean = false;
  @Input() width_max: boolean = false;
  @Input() font_size: number | undefined;
  @Input() form: boolean = false;

  @Output() buttonOnClick = new EventEmitter<void>();

  changeLoginStatus() {
    this.buttonOnClick.emit();
  }

  @HostListener("document:keydown.enter", ["$event"])
  onEnterKeyPress(_event: KeyboardEvent) {
    if (this.form) {
      this.changeLoginStatus();
    }
  }
}
