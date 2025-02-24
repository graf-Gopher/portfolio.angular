// Module imports
import { Routes } from "@angular/router";

// Project imports
import { ResolveService } from "@services/resolve.service";

export const AppRoutes: Routes = [
    {
        path: "",
        data: { jsons: ["pages", "projects", "teches"], animationState: "home" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/home/home").then((m) => m.HomePage),
    },
    {
        path: "about",
        data: { jsons: ["pages"], animationState: "about" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/about/about").then((m) => m.AboutPage),
    },
    {
        path: "skills",
        data: { jsons: ["pages", "teches"], animationState: "skills" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/skills/skills").then((m) => m.SkillsPage),
    },
    {
        path: "projects",
        data: { jsons: ["pages", "projects"], animationState: "projects" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/projects/projects").then((m) => m.ProjectsPage),
    },
    {
        path: "projects/:id",
        data: { jsons: ["pages", "projects", "teches"], animationState: "item" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/projects/item/item").then((m) => m.ProjectsItemPage),
    },
    {
        path: "contacts",
        data: { jsons: ["pages"], animationState: "contacts" },
        resolve: { data: ResolveService },
        loadComponent: () => import("./pages/site/contacts/contacts").then((m) => m.ContactsPage),
    },
];
