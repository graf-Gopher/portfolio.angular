// Module imports
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, SlicePipe } from "@angular/common";
import { CoreService, DataLangPipe, LangPipe, LangRouter } from "ngx-ute-core";
import { RouterModule } from "@angular/router";

// Project imports
import { ProjectData } from "@interfaces/projects";

@Component({
    selector: "app-home-timeline",
    standalone: true,
    imports: [MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule, LangRouter, SlicePipe],
    templateUrl: "./timeline.html",
    styleUrl: "./timeline.scss",
})
export class TimelinePage {
    @Input() public page: any = {};
    @Input() public projects: ProjectData[] = [];
    @Input() public images: string[] = [];

    /**
     * Constructor of the HomePage class.
     *
     * @param coreService The core service, used to get the language and other useful informations.
     */
    constructor(public readonly coreService: CoreService) {}
}
