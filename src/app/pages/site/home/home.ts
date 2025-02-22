// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { ActivatedRoute, RouterModule } from "@angular/router";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectData, ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {
    public page: any = {};
    public skills: ProjectTechData[] = [];
    public projects: ProjectData[] = [];

    /**
     * Constructs the HomePage component.
     * The component is initialized with the data from the route resolver.
     *
     * @param coreService The core service, used to get the language and other useful informations.
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(public readonly coreService: CoreService, private activatedRoute: ActivatedRoute) {
        this.init();
    }

    /**
     * Initializes the component with the home page data.
     * The page data is loaded from the assets/data/pages.json file.
     * The projects data is loaded from the assets/data/projects.json file and filtered with the projects codes from the page data.
     * The skills data is loaded from the assets/data/teches.json file and filtered with the skills codes from the page data.
     */
    private async init() {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages, projects, teches } = resolve.data;

        this.page = pages.home;
        this.projects = projects.filter((pd: ProjectData) => this.page.ps.projects.includes(pd.code));
        this.skills = teches.filter((td: ProjectTechData) => this.page.ss.skills.includes(td.code));
    }
}
