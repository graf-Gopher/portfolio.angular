// Module imports
import { AsyncPipe, NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { CookieService, CoreService, LangPipe, LangRouter, LangService } from "ngx-ute-core";

// Project imports
import { environment } from "@environments/environment";
import { EnvironmentData } from "@interfaces/env";

@Component({
    selector: "app-site-header",
    templateUrl: "./header.html",
    styleUrls: ["./header.scss"],
    standalone: true,
    imports: [LangPipe, MatIconModule, RouterModule, NgClass, AsyncPipe, LangRouter],
})
export class SiteHeader {
    public langsList: { name: string; code: string }[] = environment.localeList.map((lang) => ({ name: lang.split("-")[1], code: lang }));
    public currentLang: string = environment.session.locale ?? environment.defLocale;
    public menuOpen: boolean = false;
    public langOpen: boolean = false;
    public env: EnvironmentData = environment;

    /**
     * Constructor of the SiteHeader class.
     * Toggles the dark mode of the body of the document if the theme session is true.
     *
     * @param langService The language service, used to get the current language.
     * @param coreService The core service, providing application-wide functionalities.
     * @param cookieService The cookie service, used to manage cookies.
     */
    constructor(private readonly langService: LangService, public readonly coreService: CoreService, private readonly cookieService: CookieService) {
        if (environment.session.theme) {
            document.body.classList.add("dark");
        }
    }

    /**
     * Toggles the dark mode theme for the document body and updates the session theme.
     * Also sets the updated session theme in the cookies.
     */
    public changeTheme() {
        document.body.classList.toggle("dark");
        environment.session.theme = !environment.session.theme;
        this.cookieService.set("SS", environment.session);
    }

    /**
     * Changes the current language and updates the session.
     * If the selected language is different from the current language,
     * it sets the new language as the current language and updates the session.
     * Otherwise, it toggles the language selection popup.
     *
     * @param code The code of the language to change to.
     */
    public async changeLang(code: string) {
        if (code !== environment.session.locale) {
            this.langOpen = false;
            this.currentLang = environment.session.locale = code;
            this.cookieService.set("SS", environment.session);
            this.langService.setLocale(code);
        } else {
            this.langOpen = !this.langOpen;
        }
    }
}
