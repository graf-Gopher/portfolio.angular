// Module imports
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CoreService } from "ngx-ute-core";
import { fadeInOutPage } from "./animations";

// Project imports

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
    standalone: true,
    animations: [fadeInOutPage],
})
export class AppComponent {
    constructor(public coreService: CoreService) {}
}
