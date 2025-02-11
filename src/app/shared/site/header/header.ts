import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { LangPipe } from "ngx-ute-core";

@Component({
    selector: "app-site-header",
    templateUrl: "./header.html",
    styleUrls: ["./header.scss"],
    standalone: true,
    imports: [LangPipe, MatIconModule, RouterModule],
})
export class SiteHeader {
    constructor() {}
}
