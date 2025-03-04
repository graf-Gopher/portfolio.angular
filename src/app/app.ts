// Module imports
import { Component, ViewEncapsulation } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CoreService } from "ngx-ute-core";

// Project imports
import { fadeInOutPage } from "./animations";

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
    standalone: true,
    animations: [fadeInOutPage],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    constructor(public coreService: CoreService) {}
}
