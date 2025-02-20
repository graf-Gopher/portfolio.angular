import { Component } from "@angular/core";
import { SiteHeader } from "@shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@shared/site/footer/footer";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { AsyncPipe, NgClass } from "@angular/common";
import { AdminPagesContent, AdminProjectsContent } from "@constantes/admin";
import { ProjectData, ProjectTagData } from "@interfaces/projects";

@Component({
    selector: "app-projects",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, NgClass, LangPipe, DataLangPipe],
    templateUrl: "./projects.html",
    styleUrl: "./projects.scss",
})
export class ProjectsPage {
    public activeTag: string = "";
    public page: any = AdminPagesContent.projects;
    public mainProject: ProjectData = AdminProjectsContent[AdminProjectsContent.length - 1];
    public listProjects: ProjectData[] = AdminProjectsContent.slice(0, -1).reverse();
    public tags: ProjectTagData[] = [];

    constructor(public readonly coreService: CoreService) {
        this.tags = Array.from(new Set(AdminProjectsContent.flatMap((project) => project.tags.map((tag) => tag.code)))).map(
            (code) => AdminProjectsContent.flatMap((project) => project.tags).find((tag) => tag.code === code) as ProjectTagData
        );
    }
}
