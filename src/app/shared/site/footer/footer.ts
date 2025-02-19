import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { CoreService, LangPipe } from "ngx-ute-core";

@Component({
    selector: "app-site-footer",
    templateUrl: "footer.html",
    styleUrls: ["footer.scss"],
    standalone: true,
    imports: [LangPipe, MatIconModule, RouterModule, AsyncPipe],
})
export class SiteFooter {
    public year: string = new Date().getFullYear().toString();

    constructor(public readonly coreService: CoreService) {}
}
