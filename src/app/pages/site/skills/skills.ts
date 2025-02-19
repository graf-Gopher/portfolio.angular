import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@root/src/app/shared/site/footer/footer";
import { CoreService } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-skills",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe],
    templateUrl: "./skills.html",
    styleUrl: "./skills.scss",
})
export class SkillsPage {
    constructor(public readonly coreService: CoreService) {}
}
