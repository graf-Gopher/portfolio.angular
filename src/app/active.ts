// Module imports
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CookieService, HttpService, LangService, SEOService } from "ngx-ute-core";

// Project imports
import { environment } from "@environments/environment";
import { SeoPageData } from "@interfaces/page";

@Injectable({ providedIn: "root" })
export class CanActivatePage {
    constructor(private readonly seoService: SEOService, private readonly httpService: HttpService, private readonly cookieService: CookieService, private readonly langService: LangService) {}

    /**
     * Guards the route to verify if the session has a theme.
     * Checks if the route has a query parameter named "page" and if so, it loads the page data from the projects.json.
     * If not, it loads the page data from the seo.json using the route url as the key.
     * Then, updates the page data in the SEO service.
     *
     * @param route - The route to be activated.
     * @param state - The current router state.
     * @returns a boolean indicating if the route can be activated.
     */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (environment.session.theme === undefined) {
            environment.session = this.cookieService.get("SS");
            if (environment.session?.locale !== this.langService.urlToTag()) {
                this.langService.setLocale(environment.session.locale);
            }
        }

        const url: string = state.url.slice(1) || "home";
        let pageParam: string = route.queryParams["page"];

        let page: SeoPageData = {} as SeoPageData;
        if (!pageParam) {
            const seo: any = await this.httpService.httpLocal(`assets/data/seo.json`);
            page = seo[url];
        } else {
            const project: any = await this.httpService.httpLocal(`assets/data/projects.json`);
            page = project.find((pg: any) => pageParam === pg.code);
        }

        this.updatePage(page);
        return true;
    }

    /**
     * Updates the SEO service properties using the provided page data.
     * Sets the title, description, and keywords if they exist in the page data.
     * Disables the SEO service pipe.
     *
     * @param page - The SEO page data containing title, description, and keywords.
     */
    private updatePage(page: SeoPageData) {
        if (page) {
            this.seoService.pipe = false;
            this.seoService.title = page.seoTitle || "";
            this.seoService.desk = page.seoDesk || "";
            this.seoService.keys = page.seoKeywords || "";
        }
    }
}
