import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { environment } from "@root/src/environments/environment";
import { LangPipe, LangService } from "ngx-ute-core";

@Component({
    selector: "app-site-header",
    templateUrl: "./header.html",
    styleUrls: ["./header.scss"],
    standalone: true,
    imports: [LangPipe, MatIconModule, RouterModule, NgClass],
})
export class SiteHeader {
    public langsList: { name: string; code: string }[] = environment.localeList.map((lang) => ({ name: lang.split("-")[1], code: lang }));
    public currentLang: string = environment.session.locale ?? environment.defLocale;
    public menuOpen: boolean = false;

    constructor(private readonly langService: LangService) {}

    public changeTheme() {
        document.body.classList.toggle("dark");
    }

    public changeLang(code: string) {
        this.currentLang = code;
        this.langService.setLocale(code);
    }
}
