import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@root/src/app/shared/site/footer/footer";
import { CoreService, DataLangPipe, LangPipe, SliderDirective } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";
import { AdminPagesContent } from "@root/src/constantes/admin";

@Component({
    selector: "app-skills",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, SliderDirective],
    templateUrl: "./skills.html",
    styleUrl: "./skills.scss",
})
export class SkillsPage {
    public page: any = AdminPagesContent.skills;

    constructor(public readonly coreService: CoreService) {}
}
