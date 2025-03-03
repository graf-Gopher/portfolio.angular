// Module imports
import { Component, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgClass } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CoreService, DataLangPipe, LangPipe, LangRouter } from "ngx-ute-core";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-skills",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule, MatTabsModule, NgClass, LangRouter],
    templateUrl: "./skills.html",
    styleUrl: "./skills.scss",
})
export class SkillsPage {
    public page: any = {};
    public skills: any[] = [];
    public tags: string[] = ["main_dev", "dev_languages", "frameworks", "databases", "cloud_dev", "devops"];

    @ViewChild("techTab") techTab: MatTabGroup | undefined;

    /**
     * Constructor of the SkillsPage class.
     * Initializes the component with the skills page data.
     * The page data is loaded from the route resolver.
     * The pages data is loaded from the assets/data/pages.json file.
     * The skills are generated by mapping the page data to the teches data.
     *
     * @param coreService The core service, used to get the language and other useful informations.
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(public readonly coreService: CoreService, private readonly activatedRoute: ActivatedRoute) {
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

    /**
     * Changes the selected tab in the MatTabGroup to the specified index.
     *
     * @param event - The MatTabGroup instance whose selected tab index is to be changed.
     * @param index - The index of the tab to be selected.
     */
    public changeTab(event: MatTabGroup, index: number) {
        event.selectedIndex = index;
    }
}
