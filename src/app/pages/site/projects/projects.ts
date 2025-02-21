// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgClass } from "@angular/common";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { AdminPagesContent, AdminProjectsContent } from "@constantes/admin";
import { ProjectData, ProjectTagData } from "@interfaces/projects";

@Component({
    selector: "app-projects",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, NgClass, LangPipe, DataLangPipe, RouterModule],
    templateUrl: "./projects.html",
    styleUrl: "./projects.scss",
})
export class ProjectsPage {
    public activeTag: string = "";
    public page: any = AdminPagesContent.projects;
    public mainProject: ProjectData = {} as ProjectData;
    public listProjects: ProjectData[] = [];
    public tags: ProjectTagData[] = [];

    private readonly subscriptions = new Subscription();

    /**
     * @param coreService The core service, used to get the language and other useful informations
     * @param activatedRoute The activated route, used to get the query parameters (tags)
     *
     * Initialize the component with the last project as main project and the other projects as list projects.
     * If query parameters are present, filter the projects by the given tag and update the main project and the list projects.
     */
    constructor(public readonly coreService: CoreService, private readonly activatedRoute: ActivatedRoute) {
        this.init();
        this.tags = Array.from(new Set(AdminProjectsContent.flatMap((project) => project.tags.map((tag) => tag.code)))).map(
            (code) => AdminProjectsContent.flatMap((project) => project.tags).find((tag) => tag.code === code) as ProjectTagData
        );

        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe((p: any) => {
                if (Object.keys(p).length) {
                    const projects: ProjectData[] = AdminProjectsContent.filter((pr: ProjectData) => pr.tags.some((tag: ProjectTagData) => tag.code === p.tag));
                    this.mainProject = projects[projects.length - 1];
                    this.listProjects = projects.slice(0, -1).reverse();
                    this.activeTag = p.tag;
                } else {
                    this.init();
                    this.activeTag = "";
                }
            })
        );
    }

    /**
     * Initialize the main project and the list projects.
     * The main project is the last project in the AdminProjectsContent array and the list projects are all the other projects.
     * The list projects are reversed to have the most recent projects first.
     */
    private init() {
        this.mainProject = AdminProjectsContent[AdminProjectsContent.length - 1];
        this.listProjects = AdminProjectsContent.slice(0, -1).reverse();
    }

    /**
     * Clean up subscriptions when the component is destroyed.
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
