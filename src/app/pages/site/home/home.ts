// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { CoreService, DataLangPipe, LangPipe, LangRouter } from "ngx-ute-core";
import { ActivatedRoute, RouterModule } from "@angular/router";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectData, ProjectTechData } from "@interfaces/projects";
import { TimelinePage } from "./timeline/timeline";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule, LangRouter, TimelinePage],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {
    public page: any = {};
    public skills: ProjectTechData[] = [];
    public projects: ProjectData[] = [];
    public images: string[] = [];

    /**
     * Constructor of the HomePage class.
     * Initializes the component with the home page data.
     * The page data is loaded from the route resolver.
     * The pages data is loaded from the assets/data/pages.json file.
     * The projects and skills are generated by mapping the page data to the projects and teches data.
     *
     * @param coreService The core service, used to get the language and other useful informations.
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(public readonly coreService: CoreService, private readonly activatedRoute: ActivatedRoute) {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages, projects, teches } = resolve.data;

        this.page = pages.home;
        this.projects = projects.filter((pd: ProjectData) => this.page.ps.projects.includes(pd.code));
        this.skills = teches.filter((td: ProjectTechData) => this.page.ss.skills.includes(td.code));

        this.images = projects
            .filter((pd: ProjectData) => pd.date && this.page.ts.images.includes(pd.code))
            .sort((a: any, b: any) => this.page.ts.images.indexOf(a.code) - this.page.ts.images.indexOf(b.code))
            .map((pd: ProjectData) => `assets/images/projects/${pd.code}/${pd.image}`);
    }
}
