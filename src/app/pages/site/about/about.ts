import { Component } from "@angular/core";
import { SiteHeader } from "@shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@shared/site/footer/footer";
import { CoreService, DataLangPipe, LangPipe, SliderDirective } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";
import { AdminPagesContent } from "@root/src/constantes/admin";

@Component({
    selector: "app-about",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, LangPipe, DataLangPipe, SliderDirective],
    templateUrl: "./about.html",
    styleUrl: "./about.scss",
})
export class AboutPage {
    public page: any = AdminPagesContent.about;

    constructor(public readonly coreService: CoreService) {}
}
