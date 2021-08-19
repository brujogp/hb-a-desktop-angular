import {StatePlatformEnumerations} from './enumerations/StatePlatformEnumerations';

export interface StatePlatformModel {
    id: number;
    nameApp: string;
    stateTag: StateTag;
}

export interface StateTag {
    id: number;
    state: StatePlatformEnumerations;
}
