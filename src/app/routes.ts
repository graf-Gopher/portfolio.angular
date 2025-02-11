import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./pages/site/home/home").then((m) => m.HomePage),
    },
];
