// Module imports
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { NgClass, SlicePipe } from "@angular/common";
import { DataLangPipe, LangPipe, LangRouter } from "ngx-ute-core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";

// Project imports
import { SiteHeader } from "@shared/site/header/header";
import { SiteFooter } from "@shared/site/footer/footer";
import { ProjectData, ProjectTagData } from "@interfaces/projects";

@Component({
    selector: "app-projects",
    standalone: true,
    imports: [SiteHeader, SiteFooter, MatIconModule, NgClass, LangPipe, DataLangPipe, RouterModule, LangRouter, SlicePipe],
    templateUrl: "./projects.html",
    styleUrl: "./projects.scss",
})
export class ProjectsPage {
    public activeTag: string = "";
    public page: any = {};
    public mainProject: ProjectData = {} as ProjectData;
    public listProjects: ProjectData[] = [];
    public tags: ProjectTagData[] = [];

    private projects: ProjectData[] = [];

    private readonly subscriptions = new Subscription();

    /**
     * Constructeur de la classe ProjectsPage.
     * Appelle la méthode init() pour initialiser les données de la page.
     * Abonne le composant aux changements de l'URL pour charger les projets correspondants au tag.
     *
     * @param activatedRoute Le route actif, utilis pour abonner au changement de l'URL.
     */
    constructor(private readonly activatedRoute: ActivatedRoute) {
        this.init();

        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe((p: any) => {
                if (Object.keys(p).length) {
                    this.loadProjects(p.tag);
                    this.activeTag = p.tag;
                } else {
                    this.loadProjects();
                    this.activeTag = "";
                }
            })
        );
    }

    /**
     * Initializes the ProjectsPage component with project data.
     * Loads the page data from the assets/data/pages.json file and assigns it to the page property.
     * Loads the projects data from the assets/data/projects.json file and assigns it to the projects property.
     * Extracts unique tags from the projects data and assigns them to the tags property.
     * Calls the loadProjects method to load the projects.
     */
    private async init() {
        const resolve = this.activatedRoute.snapshot.data["data"];
        const { pages, projects } = resolve.data;

        this.page = pages.projects;

        this.projects = projects;
        this.tags = Array.from(new Set(this.projects.flatMap((project) => project.tags.map((tag) => tag.code)))).map(
            (code) => this.projects.flatMap((project) => project.tags).find((tag) => tag.code === code) as ProjectTagData
        );

        this.loadProjects();
    }

    /**
     * Loads projects based on the provided tag value.
     * If a tag value is provided, it filters the projects that contain the specified tag
     * and assigns the last project as the main project and the rest as a reversed list of projects.
     * If no tag value is provided, it assigns the last project in the list of all projects
     * as the main project and the rest as a reversed list of projects.
     *
     * @param tagValue Optional tag code to filter projects by.
     */
    private loadProjects(tagValue?: string) {
        if (tagValue) {
            const projects: ProjectData[] = this.projects.filter((pr: ProjectData) => pr.tags.some((tag: ProjectTagData) => tag.code === tagValue));
            this.mainProject = projects[projects.length - 1];
            this.listProjects = projects.slice(0, -1).reverse();
        } else {
            this.mainProject = this.projects[this.projects.length - 1];
            this.listProjects = this.projects.slice(0, -1).reverse();
        }
    }

    /**
     * Clean up subscriptions when the component is destroyed.
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
