// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgClass } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CoreService, DataLangPipe, LangPipe, LangRouter, SliderDirective } from "ngx-ute-core";
import { Lightbox, LightboxModule } from "ngx-lightbox";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectData, ProjectTagData, ProjectTechData } from "@interfaces/projects";

@Component({
    selector: "app-projects-item",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, SliderDirective, RouterModule, LangRouter, NgClass, LightboxModule],
    templateUrl: "./item.html",
    styleUrl: "./item.scss",
})
export class ProjectsItemPage {
    public page: any = {};
    public itemData: ProjectData = {} as ProjectData;
    public tags: string = "";
    public teches: ProjectTechData[] = [];

    /**
     * Constructor of the ProjectsItemPage class.
     * Initializes the component with project item data.
     * The data is fetched from the route resolver and processed to derive the page, tags, and teches information.
     *
     * @param coreService The core service used for application-wide utilities.
     * @param activatedRoute The activated route used to get the data from the route resolver.
     * @param dataLangPipe The data language pipe used for transforming tag names.
     */
    constructor(public readonly coreService: CoreService, private readonly activatedRoute: ActivatedRoute, private readonly dataLangPipe: DataLangPipe, private readonly lightbox: Lightbox) {
        const resolve = this.activatedRoute.snapshot.data["data"];
        this.itemData = resolve.item;
        const { pages, teches } = resolve.data;

        this.page = pages.project;

        this.tags = this.itemData.tags.map((tg: ProjectTagData) => this.dataLangPipe.transform(tg.name)).join(", ");

        this.teches = teches.filter((td: ProjectTechData) => this.itemData.tech.includes(td.code));
    }

    public onOpen(image: any) {
        const lightboxGallery: any[] = this.itemData.images.map((md: string) => {
            return {
                code: md,
                src: `/assets/images/projects/${this.itemData.code}/${md.replace("_min", "")}`,
                thumb: `/assets/images/projects/${this.itemData.code}/${md}`,
            };
        });
        const index: number = lightboxGallery.map((md: any) => md.code).indexOf(image);
        this.lightbox.close();
        this.lightbox.open(lightboxGallery, index);
    }
}
