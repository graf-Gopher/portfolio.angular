// Module imports
import { Component } from "@angular/core";
import { DataLangPipe } from "ngx-ute-core";
import { ActivatedRoute } from "@angular/router";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";

@Component({
    selector: "app-docs",
    standalone: true,
    imports: [SiteHeader, SiteFooter, DataLangPipe],
    templateUrl: "./docs.html",
    styleUrl: "./docs.scss",
})
export class DocsPage {
    public content: any = {};

    /**
     * Constructor of the DocsPage class.
     * Subscribes to the activated route's parameters to get the doc text content.
     * The content is loaded from the route resolver data.
     *
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(private readonly activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe(() => {
            const resolve = this.activatedRoute.snapshot.data["data"];
            this.content = resolve.item.text;
        });
    }
}
