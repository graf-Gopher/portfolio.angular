import { Component } from "@angular/core";
import { SiteHeader } from "../../../shared/site/header/header";
import { MatIconModule } from "@angular/material/icon";
import { SiteFooter } from "@root/src/app/shared/site/footer/footer";
import { CoreService } from "ngx-ute-core";
import { AsyncPipe, NgClass } from "@angular/common";

interface ProjectTagData {
    name: string;
    code: string;
}

interface ProjectData {
    code: string;
    title: string;
    text: string;
    image: string;
    tags: ProjectTagData[];
    date: string;
}

@Component({
    selector: "app-projects",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, AsyncPipe, NgClass],
    templateUrl: "./projects.html",
    styleUrl: "./projects.scss",
})
export class ProjectsPage {
    public activeTag: string = "";
    public tags: ProjectTagData[] = [];
    public projects: ProjectData[] = [
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
        {
            code: "1",
            title: "Understanding Modern Web Development Trends",
            text: "Dive into the latest trends shaping the web development landscape.",
            image: "https://www.relume.io/__assets/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg",
            tags: [
                {
                    name: "Tech",
                    code: "tech",
                },
            ],
            date: "2024",
        },
    ];
    constructor(public readonly coreService: CoreService) {}
}
