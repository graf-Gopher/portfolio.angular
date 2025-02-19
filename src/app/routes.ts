import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./pages/site/home/home").then((m) => m.HomePage),
    },
    {
        path: "about",
        loadComponent: () => import("./pages/site/about/about").then((m) => m.AboutPage),
    },
    {
        path: "skills",
        loadComponent: () => import("./pages/site/skills/skills").then((m) => m.SkillsPage),
    },
    {
        path: "projects",
        loadComponent: () => import("./pages/site/projects/projects").then((m) => m.ProjectsPage),
    },
    {
        path: "projects/:id",
        loadComponent: () => import("./pages/site/projects/item/item").then((m) => m.ProjectsItemPage),
    },
    {
        path: "contacts",
        loadComponent: () => import("./pages/site/contacts/contacts").then((m) => m.ContactsPage),
    },
];
