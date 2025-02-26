// Module imports
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from "@angular/router";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { provideNgxUteCore } from "ngx-ute-core";

// Project imports
import { AppRoutes } from "./routes";
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideNgxUteCore({
            environment: environment,
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            AppRoutes,
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
