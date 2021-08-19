import {Component, OnInit} from '@angular/core';
import {VersionsListModel} from '../../../models/versions-list.model';
import {LocalStorageKeyEnum} from '../../../enumerations/local-storage-key.enum';
import {HttpRequestService} from '../../../services/http-request.service';
import {CommunicationService} from '../../../services/communication.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
    showListLanguage = false;
    showListVersions = false;

    public versionsList: VersionsListModel[];
    currentVersion: number;

    constructor(private changeVersionService: CommunicationService) {
    }

    ngOnInit(): void {
        this.versionsList = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.VERSIONS_LIST));
        const auxiliaryCurrentVersion: VersionsListModel = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.DEFAULT_VERSION));

        if (auxiliaryCurrentVersion !== null) {
            this.currentVersion = auxiliaryCurrentVersion.year;
        }

        this.changeVersionService.observableVersionChanges.subscribe(value => {
            this.currentVersion = value.year;
            this.versionsList = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.VERSIONS_LIST));
        });
    }

    showHiddenListLanguage(): void {
        this.showListLanguage = !this.showListLanguage;
    }

    showHiddenListVersionsList(): void {
        this.showListVersions = !this.showListVersions;
    }


    versionChose($event: VersionsListModel): void {
        localStorage.setItem(LocalStorageKeyEnum.DEFAULT_VERSION, JSON.stringify($event));
        this.showListVersions = !this.showListVersions;
        this.changeVersionService.changeVersionInfo($event);

    }
}
