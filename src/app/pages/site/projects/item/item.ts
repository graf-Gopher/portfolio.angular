// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CoreService, DataLangPipe, LangPipe, SliderDirective } from "ngx-ute-core";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectData, ProjectTagData, ProjectTechData } from "@interfaces/projects";
import { AdminPagesContent, AdminTechesContent } from "@constantes/admin";

@Component({
    selector: "app-projects-item",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, SliderDirective],
    templateUrl: "./item.html",
    styleUrl: "./item.scss",
})
export class ProjectsItemPage {
    public page: any = AdminPagesContent.project;
    public itemData: ProjectData = {} as ProjectData;
    public tags: string = "";
    public teches: ProjectTechData[] = [];

    /**
     * Initialize the component with the route data.
     * 
     * @param coreService The core service, used to get the language and other useful informations
     * @param activatedRoute The activated route, used to get the data from the route
     * @param dataLangPipe The data lang pipe, used to translate the tags
/******  e28fef09-f5dd-483c-8869-583d54a1428c  *******/
    constructor(public readonly coreService: CoreService, private activatedRoute: ActivatedRoute, private dataLangPipe: DataLangPipe) {
        this.itemData = this.activatedRoute.snapshot.data["data"];
        this.tags = this.itemData.tags.map((tg: ProjectTagData) => this.dataLangPipe.transform(tg.name)).join(", ");
        this.teches = AdminTechesContent.filter((tc: ProjectTechData) => this.itemData.tech.includes(tc.code));
    }
}
