// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgClass } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-skills",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule, MatTabsModule, NgClass],
    templateUrl: "./skills.html",
    styleUrl: "./skills.scss",
})
export class SkillsPage {
    public page: any = {};
    public skills: any[] = [];
    public tags: string[] = ["main_dev", "dev_languages", "frameworks", "databases", "cloud_dev", "devops"];

    /**
     * Constructs the SkillsPage class.
     * Initializes the component by invoking the init() method.
     *
     * @param coreService The core service providing application-wide functionalities.
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(public readonly coreService: CoreService, private activatedRoute: ActivatedRoute) {
        this.init();
    }

    /**
     * Initializes the component with skills data.
     * Loads the page data from the assets/data/pages.json file and assigns it to the page property.
     * Loads the skills data from the assets/data/teches.json file and assigns it to the skills property.
     * Maps the skills data to the page data and assigns it to the skills property.
     */
    private async init() {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages, teches } = resolve.data;

        this.page = pages.skills;

        this.skills = this.page.ms.contents.map((tab: any[]) => {
            return tab.map((ct: any) => {
                const tech: ProjectTechData = teches.find((td: ProjectTechData) => td.code === ct.feature);

                return { ...ct, ...tech };
            });
        });
    }

    public changeTab(event: MatTabGroup, index: number) {
        event.selectedIndex = index;
    }
}
