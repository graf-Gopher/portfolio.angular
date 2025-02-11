import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from "@angular/router";

import { AppRoutes } from "./routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { provideNgxUteCore } from "ngx-ute-core";
import { environment } from "../environments/environment";
import { PagesConst } from "../constantes/pages";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideNgxUteCore({
            environment: environment,
            pages: PagesConst,
        }),

        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            AppRoutes,
            // withDebugTracing(),
            withInMemoryScrolling({
                scrollPositionRestoration: "enabled",
                anchorScrolling: "enabled",
            }),
            withRouterConfig({
                onSameUrlNavigation: "reload",
            }),
            withEnabledBlockingInitialNavigation()
        ),
        provideClientHydration(withEventReplay()),
    ],
};
