// Module imports
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from "@angular/router";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
// import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { provideNgxUteCore } from "ngx-ute-core";

// Project imports
import { AppRoutes } from "./routes";
import { environment } from "../environments/environment";
import { PagesConst } from "../constantes/pages";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        // provideAnimationsAsync(),
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
