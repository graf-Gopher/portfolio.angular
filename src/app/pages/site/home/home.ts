import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {}
