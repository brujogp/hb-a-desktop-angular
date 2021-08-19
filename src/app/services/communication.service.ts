import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {VersionsListModel} from '../models/versions-list.model';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    subjectLanguage = new Subject<string>();
    subjectEmitterLanguage = this.subjectLanguage.asObservable();

    private subjectVersionChanger = new Subject<VersionsListModel>();
    public observableVersionChanges = this.subjectVersionChanger.asObservable();

    public isShowFirstTimeHB = true;

    constructor() {
    }

    public changeLanguage(lang: string): void {
        this.subjectLanguage.next(lang);
    }

    public changeVersionInfo(versionModel: VersionsListModel): void {
        this.subjectVersionChanger.next(versionModel);
    }
}
