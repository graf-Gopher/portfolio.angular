import { EnvironmentData } from "@interfaces/env";

export const environment: EnvironmentData = {
    production: true,

    localeList: ["en-EN", "uk-UA"],
    defLocale: "en-EN",

    session: {} as any,
    ssr: true,
    gtag: "G-YH14BJDS30",
};
