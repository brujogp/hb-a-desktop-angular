export interface HbModels {
    id: number;
    name: string;
    lastUpdate: Date;
    language: Language;
    acronym: string;
    iconURL: string;
    orderShowing: number;
    childSubsectionsList: ChildSubsectionsList[];
}

export interface ChildSubsectionsList {
    id: number;
    name: string;
    lastUpdate: Date;
    orderShowing: number;
    language: Language;
    iconURL: string;
    paaList: PaaItem[];
    taList: TaItem[];
}

export enum Language {
    Es = 'es'
}

export interface PaaItem {
    id: number;
    name: string;
    description: string;
    orderShowing: number;
    iconImageURL: string;
    alternativeName: string;
    language: Language;
}

export interface TaItem {
    id: number;
    name: string;
    description: string;
    iconImageURL: string;
    orderShowing: number;
    language: Language;
}
