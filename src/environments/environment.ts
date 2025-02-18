import { EnvironmentData } from "@interfaces/env";

export const environment: EnvironmentData = {
    production: false,

    localeList: ["en-EN", "uk-UA", "uk-IK", "uk-DF", "uk-VF"],
    defLocale: "en-EN",

    session: {} as any,
    ssr: false,
    gtag: "G-YH14BJDS30",
};
