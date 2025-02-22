// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CoreService, DataLangPipe, LangPipe } from "ngx-ute-core";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";

@Component({
    selector: "app-about",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, RouterModule],
    templateUrl: "./about.html",
    styleUrl: "./about.scss",
})
export class AboutPage {
    public page: any = {};

    /**
     * Constructeur de la classe HomePage.
     * Appelle la méthode init() pour initialiser les données de la page.
     *
     * @param coreService Le service de base qui fournit des informations sur l'application.
     * @param activatedRoute The activated route, used to get the data from the route resolver.
     **/
    constructor(public readonly coreService: CoreService, private activatedRoute: ActivatedRoute) {
        this.init();
    }

    /**
     * Initializes the component with the about page data.
     * Loads the page data from the assets/data/pages.json file and assigns it to the page property.
     */
    private async init() {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages } = resolve.data;

        this.page = pages.about;
    }
}
