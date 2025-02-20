import { Component } from "@angular/core";
import { SiteHeader } from "@shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@shared/site/footer/footer";
import { CoreService, DataLangPipe, LangPipe, SliderDirective } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";
import { ProjectData, ProjectTagData, ProjectTechData } from "@interfaces/projects";
import { ActivatedRoute } from "@angular/router";
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

    constructor(public readonly coreService: CoreService, private activatedRoute: ActivatedRoute, private dataLangPipe: DataLangPipe) {
        this.itemData = this.activatedRoute.snapshot.data["data"];
        this.tags = this.itemData.tags.map((tg: ProjectTagData) => this.dataLangPipe.transform(tg.name)).join(", ");
        this.teches = AdminTechesContent.filter((tc: ProjectTechData) => this.itemData.tech.includes(tc.code));
    }
}
