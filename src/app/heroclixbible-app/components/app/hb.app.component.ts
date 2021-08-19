import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpRequestService} from '../../../services/http-request.service';
import {ChildSubsectionsList, HbModels, PaaItem, TaItem} from '../../../models/hb.models';
import {descriptionAnim} from '../../../animations/to-app.animation';
import {CommunicationService} from '../../../services/communication.service';
import {TranslateService} from '@ngx-translate/core';
import {VersionsListModel} from '../../../models/versions-list.model';
import {LocalStorageKeyEnum} from '../../../enumerations/local-storage-key.enum';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-hb',
    templateUrl: './hb.app.component.html',
    styleUrls: ['./hb.app.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        descriptionAnim
    ]
})
export class HBAppComponent implements OnInit {
    sections: HbModels[] = [];
    childSubsectionsList: ChildSubsectionsList[] = [];

    genericList = [];

    // Item clicked from
    itemClicked: PaaItem;

    triggered = false;
    tagSectionSelected: string;

    version: VersionsListModel;

    isLoad = true;

    // tslint:disable-next-line:max-line-length
    constructor(private httpService: HttpRequestService, private communicationService: CommunicationService, private translateService: TranslateService) {
        if (JSON.parse(localStorage.getItem(LocalStorageKeyEnum.DEFAULT_VERSION))) {
            this.version = JSON.parse(localStorage.getItem(LocalStorageKeyEnum.DEFAULT_VERSION));
        }
    }

    ngOnInit(): void {
        this.httpService.getSectionsWithVersion(this.version, this.translateService.currentLang).subscribe(data => {
            this.isLoad = true;
            this.sections = data;

            setTimeout(() => {
                this.isLoad = false;
            }, 500);
        });

        this.communicationService.subjectEmitterLanguage.subscribe((lang: string) => {
            this.httpService.getSectionsWithVersion(this.version, lang).subscribe(data => {
                this.isLoad = true;

                this.childSubsectionsList = [];
                this.genericList = null;
                this.itemClicked = null;

                this.sections = data;
                setTimeout(() => {
                    this.isLoad = false;
                }, 500);
            });
        });

        this.communicationService.observableVersionChanges.subscribe((value: VersionsListModel) => {
            this.version = value;
            this.httpService.getSectionsWithVersion(value, this.translateService.currentLang).subscribe(data => {
                this.isLoad = true;

                this.childSubsectionsList = [];
                this.genericList = null;
                this.itemClicked = null;

                this.sections = data;

                setTimeout(() => {
                    this.isLoad = false;
                }, 300);
            });

            if (this.communicationService.isShowFirstTimeHB && this.version.year) {
                Swal.fire({
                    title: 'Estás viendo la versión ' + this.version.year,
                    width: 600,
                    padding: '3em',
                    background: '#20252d',
                    text: 'Para cambiar la versión, presiona el número de la versión actual y después selecciona la que más te interese.',
                    imageUrl: 'https://cdn.heroclixbible.com/images/tuto.png',
                    imageWidth: 500,
                    imageHeight: 300,
                    imageAlt: 'Custom image',
                    confirmButtonColor: `rgb(0, 0, 0)`,
                    backdrop: `rgba(36, 42, 51, .7)`,
                    showClass: {
                        popup: 'animate__animated animate__fadeIn animate__faster'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut animate__faster'
                    }
                });

                this.communicationService.isShowFirstTimeHB = false;
            }
        });
    }

    onClickSection(item: HbModels, buttonSection: HTMLDivElement, section: HTMLDivElement): void {
        // Quita la clase para resaltar el elemento seleccionado
        for (let i = 0; section.children.length > i; i++) {
            const element: HTMLElement = section.children[i] as HTMLElement;
            element.style.border = 'none';
        }
        // Debido a la condición de llenado de las variables, hago desaparecer el contenido de los hijos
        // cada que presiono una nueva sección
        this.childSubsectionsList = null;
        this.genericList = null;
        this.itemClicked = null;
        buttonSection.style.border = '3px solid white';

        this.tagSectionSelected = item.name;

        // En un futuro, tendré que hacer un proceso porque el formato de las secciones cambiará
        this.childSubsectionsList = item.childSubsectionsList;

        // Ordeno el arreglo de subsecciones a partir del campo orderShowing
        // TODO: Hacer esto un método global
        this.childSubsectionsList.sort((a, b) => {
            if (a.orderShowing < b.orderShowing) {
                return -1;
            }
            if (a.orderShowing > b.orderShowing) {
                return 1;
            }
            return 0;
        });
    }

    onClickSubsection(indexOfSubsectionSelected: number, buttonSubsection: HTMLDivElement, subsection: HTMLDivElement): void {
        for (let i = 0; subsection.children.length > i; i++) {
            const element: HTMLElement = subsection.children[i] as HTMLElement;
            element.style.background = 'none';
        }

        const genericList = this.childSubsectionsList[indexOfSubsectionSelected];

        buttonSubsection.style.backgroundColor = '#4a5c7d';

        if (genericList.paaList.length > 0) {
            this.genericList = genericList.paaList as PaaItem[];
        }
        if (genericList.taList.length > 0) {
            this.genericList = genericList.taList as TaItem[];
        }
    }

    onClickItem(item, buttonItem: HTMLDivElement): void {
        for (let i = 0; buttonItem.parentElement.children.length > i; i++) {
            const element = buttonItem.parentElement.children[i] as HTMLElement;
            element.style.opacity = '.3';
        }
        buttonItem.style.opacity = '1';
        this.itemClicked = item;
        this.triggered = !this.triggered;
    }
}
