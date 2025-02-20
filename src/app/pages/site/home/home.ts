import { Component } from "@angular/core";
import { SiteHeader } from "@shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@shared/site/footer/footer";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";
import { AdminPagesContent, AdminTechesContent } from "@constantes/admin";
import { ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {
    public page: any = AdminPagesContent.home;
    public skills: ProjectTechData[] = AdminTechesContent.filter((tc: ProjectTechData) => this.page.ss.skills.includes(tc.code));

    constructor(public readonly coreService: CoreService) {}
}
