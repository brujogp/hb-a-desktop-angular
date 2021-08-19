import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpRequestService} from '../../../../services/http-request.service';
import {VersionsListModel} from '../../../../models/versions-list.model';
import {LocalStorageKeyEnum} from '../../../../enumerations/local-storage-key.enum';

@Component({
    selector: 'app-version-list',
    templateUrl: './version-list.component.html',
    styleUrls: ['./version-list.component.css']
})
export class VersionListComponent implements OnInit {
    @Input() versionsListFromParent: VersionsListModel[];
    @Output() versionChose = new EventEmitter<VersionsListModel>();
    public versionsList: VersionsListModel[];

    constructor() {
    }

    ngOnInit(): void {
        if (this.versionsListFromParent) {
            this.versionsList = this.versionsListFromParent;
        }
    }

    clickedVersion(index: number): void {
        this.versionChose.emit(this.versionsList[index]);
    }
}
