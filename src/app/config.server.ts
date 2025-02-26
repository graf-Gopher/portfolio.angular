// Module imports
import { mergeApplicationConfig, ApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideServerRouting } from "@angular/ssr";

// Project imports
import { appConfig } from "./config";
import { serverRoutes } from "./routes.server";

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering(), provideServerRouting(serverRoutes)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
