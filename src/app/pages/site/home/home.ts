// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { RouterModule } from "@angular/router";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { AdminPagesContent, AdminProjectsContent, AdminTechesContent } from "@constantes/admin";
import { ProjectData, ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {
    public page: any = AdminPagesContent.home;
    public skills: ProjectTechData[] = [];
    public projects: ProjectData[] = [];

    /**
     * Class constructor.
     *
     * @param coreService The core service.
     */
    constructor(public readonly coreService: CoreService) {
        this.skills = AdminTechesContent.filter((td: ProjectTechData) => this.page.ss.skills.includes(td.code));
        this.projects = AdminProjectsContent.filter((pd: ProjectData) => this.page.ps.projects.includes(pd.code));
    }
}
