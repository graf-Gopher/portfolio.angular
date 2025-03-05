import { UteEnvironment } from "ngx-ute-core";

export interface EnvironmentData extends UteEnvironment {
    session: SessionData;
}

export interface SessionData {
    locale: string;
    theme: boolean;
}
