import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {bottomMenuAnim, childrenAnimFromParent, heroAnimation, leDiv, otherTrigger} from './animations/to-app.animation';
import {Meta} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {HttpRequestService} from './services/http-request.service';
import {StatePlatformModel} from './models/state-platform.model';
import {StatePlatformEnumerations} from './models/enumerations/StatePlatformEnumerations';
import {VersionsListModel} from './models/versions-list.model';
import {LocalStorageKeyEnum} from './enumerations/local-storage-key.enum';
import {CommunicationService} from './services/communication.service';

declare var gtag;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        otherTrigger,
        leDiv,
        heroAnimation,
        bottomMenuAnim,
        childrenAnimFromParent
    ]
})
export class AppComponent implements OnInit {
    public redirect: boolean;
    langBrowser: string;

    public statePlatform = true;
    private versionList: VersionsListModel[];

    constructor(private router: Router, private meta: Meta,
                private translateService: TranslateService,
                private httpRequestService: HttpRequestService,
                private communicationService: CommunicationService) {
        // Comunicación con Google Analytics
        const navEndEvent$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        );

        navEndEvent$.subscribe((event: NavigationEnd) => {
            gtag('config', 'G-GNTZR8TKQP', {
                'page-path': event.urlAfterRedirects
            });
        });

        this.meta.addTags([
            {
                name: 'description',
                content: 'Heroclix Bible es una aplicación multiplataforma que reune y crea diferentes recursos e informacion sobre el Universo Heroclix en diferentes idiomas.'
            },
            {name: 'author', content: 'Velendy'},
            {name: 'keywords', content: 'Heroclix, Heroclix Bible, Heroclix Rules, Heroclix Forum, Heroclix Project, Velendy'}
        ]);

        this.meta.updateTag({
            name: 'description',
            content: 'Heroclix Bible es una aplicación multiplataforma que reune y crea diferentes recursos e informacion sobre el Universo Heroclix en diferentes idiomas.'
        });

        this.langBrowser = navigator.language;
        this.langBrowser = this.langBrowser.split('-')[0];

        translateService.setDefaultLang(this.langBrowser);
        translateService.use(this.langBrowser);

    }

    ngOnInit(): void {
        // Redireccionamiento para celulares
        const userAgentString = window.navigator.userAgent;
        if (((userAgentString.includes('Android') || userAgentString.includes('iPhone') || userAgentString.includes('Windows Phone')))) {
            window.location.href = 'https://m.heroclixbible.com/';
            this.redirect = true;
        } else {
            this.redirect = false;
        }

        this.httpRequestService.getStatePlatform('heroclixbible').subscribe((value: StatePlatformModel) => {
            const {state} = value.stateTag;
            this.statePlatform = state === StatePlatformEnumerations.ONLINE;
        });

        this.configVersions();
    }

    // Verificación de la existencia de la propiedad 'animation' en activateRouteData
    // que puede venir de alguna ruta.
    // tslint:disable-next-line:typedef
    public outletVerify(routerOutlet: RouterOutlet) {
        return routerOutlet &&
            routerOutlet.activatedRouteData &&
            routerOutlet.activatedRouteData.animation;
    }

    private configVersions(): void {
        // Get All versions for information
        this.httpRequestService.getVersionsList().subscribe((value: VersionsListModel[]) => {
            this.versionList = value;
            localStorage.setItem(LocalStorageKeyEnum.VERSIONS_LIST, JSON.stringify(this.versionList));
            this.setVersion();
        });
    }

    private setVersion(): void {
        // Create Default version
        const versionDefault = localStorage.getItem(LocalStorageKeyEnum.DEFAULT_VERSION);
        if (versionDefault === null) {
            const versionsList: VersionsListModel[] = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.VERSIONS_LIST));
            if (versionsList) {
                localStorage.setItem(LocalStorageKeyEnum.DEFAULT_VERSION, JSON.stringify(versionsList[0]));
            }
            this.communicationService.changeVersionInfo(versionsList[0]);
        }
    }
}
