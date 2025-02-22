// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CoreService, DataLangPipe, HttpService, LangPipe } from "ngx-ute-core";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";

@Component({
    selector: "app-skills",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule],
    templateUrl: "./skills.html",
    styleUrl: "./skills.scss",
})
export class SkillsPage {
    public page: any = {};

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
     * Initialize the component with the skills page data.
     * The page data is loaded from the assets/data/pages.json file
     * and assigned to the page property.
     */
    private async init() {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages } = resolve.data;

        this.page = pages.skills;
    }
}
