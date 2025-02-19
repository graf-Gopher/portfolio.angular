import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@root/src/app/shared/site/footer/footer";
import { CoreService } from "ngx-ute-core";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class HomePage {
    public images: string[] = [
        "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
        "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
        "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
        "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
    ];
    public skills: { image: string; name: string }[] = [
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
        { image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg", name: "Angular" },
    ];
    public projects: { image: string; name: string; description: string }[] = [
        {
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            name: "Date",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            name: "Date",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            name: "Date",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            name: "Date",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            name: "Date",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
    ];

    constructor(public readonly coreService: CoreService) {}
}
