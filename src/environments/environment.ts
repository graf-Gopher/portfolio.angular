import { EnvironmentData, SessionData } from "@interfaces/env";

export const environment: EnvironmentData = {
    production: false,

    localeList: ["en-EN", "uk-UA"],
    defLocale: "en-EN",

    session: {} as SessionData,
    ssr: false,
};
