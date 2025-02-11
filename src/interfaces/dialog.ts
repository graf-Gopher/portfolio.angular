export interface Dialog {
    title: string;
    text: string;
    settings: DialogSettings;
}

export interface DialogSettings {
    isTitleLocale?: boolean;
    isTextLocale?: boolean;
    isButtonLocale?: boolean[];
    buttonsTitle?: { yes?: string; no?: string };
    // buttonsAction?: string[];
    isInput?: boolean;
    isSelect?: { id: number; value: string }[];
    isInfo?: boolean;
    isCheck?: string;
    isQuestion?: boolean;
}
