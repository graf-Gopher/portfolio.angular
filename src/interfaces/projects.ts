export interface ProjectTagData {
    name: string;
    code: string;
}

export interface ProjectData {
    code: string;
    title: string;
    text: string;
    image: string;
    images: string[];
    tags: ProjectTagData[];
    date: string;
    time: string[];
    client: string;
    role: string;
    tech: string[];
    devs: { title: string; text: string }[];
    link?: string;
}

export interface ProjectTechData {
    code: string;
    name: string;
    image: string;
}
