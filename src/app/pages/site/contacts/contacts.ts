// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { DataLangPipe, LangPipe } from "ngx-ute-core";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";

@Component({
    selector: "app-contacts",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, LangPipe, DataLangPipe],
    templateUrl: "./contacts.html",
    styleUrl: "./contacts.scss",
})
export class ContactsPage {
    public page: any = {};
    public links: any[] = [];

    /**
     * Constructor of the ContactsPage class.
     * Initializes the component with the contacts page data.
     * The page data is loaded from the route resolver.
     * The links are filtered with the links that have a title.
     *
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     */
    constructor(private readonly activatedRoute: ActivatedRoute) {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages } = resolve.data;

        this.page = pages.contacts;
        this.links = this.page.ls.links.filter((link: any) => link.title);
    }
}
