import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { LangPipe } from "ngx-ute-core";

@Component({
    selector: "app-site-footer",
    templateUrl: "footer.html",
    styleUrls: ["footer.scss"],
    standalone: true,
    imports: [LangPipe, MatIconModule, RouterModule],
})
export class SiteFooter {}
