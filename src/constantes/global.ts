import { InterfaceObject } from "ngx-ute-core";

import { DialogSettings } from "@interfaces/dialog";
import { CommentsData } from "@models/comments.model";
import { ContentsData } from "@models/contents.model";
import { LogsData } from "@models/logs.model";
import { MediaData } from "@models/media.model";
import { MenusData } from "@models/menus.model";
import { PagesData } from "@models/pages.model";
import { SettingsData } from "@models/settings.model";
import { UsersData } from "@models/users.model";
import { AnalyticsData } from "@interfaces/models/analytics.model";

export interface RoutersData {
    pages: PagesData[];
    media: MediaData[];
    menus: MenusData[];
    logs: LogsData[];
    settings: SettingsData[];
    users: UsersData[];
    contents: ContentsData[];
    comments: CommentsData[];
    analytics: AnalyticsData[];
}

const GlobalTables: InterfaceObject<RoutersData> = {
    pages: "pages",
    media: "media",
    menus: "menus",
    logs: "logs",
    settings: "settings",
    users: "users",
    contents: "contents",
    comments: "comments",
    analytics: "analytics",
};

const GlobalMethods = {
    login: "account/login",
    reg: "account/reg",
    rest: "account/rest",
    pass: "account/pass",
    activation: "account/activation",
    activated: "account/activated",
    order: "order",
    media: "media",
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
    count: "COUNT",
    auth: "auth",
};

enum GlobalStatues {
    wait = "wait",
    error = "error",
    progress = "progress",
    block = "block",
    complete = "complete",
}

const GlobalDialogsSettings = {
    /**
     * True - False
     */
    select: {
        isTitleLocale: true,
        isTextLocale: true,
        // buttonsTitle: ["yes", "no"],
        // isButtonLocale: [true, true],
        // buttonsAction: ["true", "false"],
    } as DialogSettings,
    /**
     * OK
     */
    confirm: {
        isTitleLocale: true,
        isTextLocale: true,
        buttonsTitle: { no: "close" },
        isButtonLocale: [true],
        // buttonsAction: [],
        isInfo: true,
    } as DialogSettings,
    confirmCustom: {
        isTitleLocale: true,
        buttonsTitle: { no: "close" },
        isButtonLocale: [true],
        // buttonsAction: [],
        isInfo: true,
    } as DialogSettings,
    /**
     * Save
     */
    selector: {
        isTitleLocale: true,
        buttonsTitle: { no: "cancel", yes: "save" },
        isButtonLocale: [true],
        // buttonsAction: [],
        isSelect: [],
    } as DialogSettings,
    /**
     * Save + isInput
     */
    input: {
        isTitleLocale: true,
        buttonsTitle: ["save"],
        isButtonLocale: [true],
        // buttonsAction: [],
        isInput: true,
    } as DialogSettings,
};

export const GlobalConst = {
    _tables: GlobalTables,
    _statuses: GlobalStatues,
    _methods: GlobalMethods,
    _dialogs: GlobalDialogsSettings,
};
