import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@root/src/app/shared/site/footer/footer";
import { CoreService } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-contacts",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe],
    templateUrl: "./contacts.html",
    styleUrl: "./contacts.scss",
})
export class ContactsPage {
    constructor(public readonly coreService: CoreService) {}
}
