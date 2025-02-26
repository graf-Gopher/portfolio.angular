// Module imports
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LangPipe, LangRouter } from "ngx-ute-core";

@Component({
    selector: "app-site-footer",
    templateUrl: "footer.html",
    styleUrls: ["footer.scss"],
    standalone: true,
    imports: [LangPipe, RouterModule, LangRouter],
})
export class SiteFooter {
    public year: string = new Date().getFullYear().toString();

    constructor() {}
}
