import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HbModels} from '../models/hb.models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {StatePlatformModel} from '../models/state-platform.model';
import {VersionsListModel} from '../models/versions-list.model';
import {LocalStorageKeyEnum} from '../enumerations/local-storage-key.enum';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {
    private URL_ENDPOINT = environment.urlAPI + '/v1/sections/';
    private URL_STATE_PLATFORM = environment.urlAPI + '/v1/state-apps/';
    private URL_VERSIONS = environment.urlAPI + '/v1/versions/';

    constructor(private httpClient: HttpClient, private translateService: TranslateService) {
    }

    public getSections(lang: string): Observable<HbModels[]> {
        const httpHeaders = new HttpHeaders({
            'Accept-Language': lang
        });
        return this.httpClient.get<HbModels[]>(this.URL_ENDPOINT, {headers: httpHeaders});
    }

    public getStatePlatform(namePlatform: string): Observable<StatePlatformModel> {
        return this.httpClient.get<StatePlatformModel>(this.URL_STATE_PLATFORM + namePlatform);
    }

    public getVersionsList(): Observable<VersionsListModel[]> {
        return this.httpClient.get<VersionsListModel[]>(this.URL_VERSIONS);
    }

    public getSectionsWithVersion(version: VersionsListModel, lang: string): Observable<HbModels[]> {
        const httpHeaders = new HttpHeaders({
            'Accept-Language': lang
        });

        /*        return this.httpClient.request<HbModels[]>('GET', this.URL_ENDPOINT, {
                    body: {
                        id: version.id,
                        year: version.year
                    },
                    headers: httpHeaders
                });

         */

        return this.httpClient.post<HbModels[]>(this.URL_ENDPOINT, version, {headers: httpHeaders});
    }

}
