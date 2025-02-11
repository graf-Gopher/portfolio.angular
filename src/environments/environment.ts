import { EnvironmentData } from "@interfaces/env";

export const environment: EnvironmentData = {
    production: false,

    localeList: ["en-EN", "uk-UA"],
    defLocale: "en-EN",

    session: {} as any,
    ssr: false,
    gtag: "G-YH14BJDS30",
};
