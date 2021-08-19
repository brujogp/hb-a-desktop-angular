import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EventEmitter} from '@angular/core';
import {CommunicationService} from '../../../../services/communication.service';
import {isObservable} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit, AfterViewInit {
    @Output() setVisibility = new EventEmitter<boolean>();
    @Input() stateListLanguage: boolean;

    @ViewChild('es_button') esButton: HTMLButtonElement;
    @ViewChild('en_button') enButton: HTMLButtonElement;

    // tslint:disable-next-line:max-line-length
    constructor(private translateService: TranslateService, private comunicationService: CommunicationService, private elementRef: ElementRef) {

    }

    changeLanguage(lang: string, buttonPressed: HTMLButtonElement): void {
        if (!(this.translateService.currentLang === lang)) {
            this.translateService.use(lang);
            this.setVisibility.emit(false);
            this.comunicationService.changeLanguage(lang);
        }
    }

    ngAfterViewInit(): void {
        if (this.stateListLanguage) {
            switch (this.translateService.currentLang) {
                case 'es': {
                    this.elementRef.nativeElement.querySelector('#es_button').style.opacity = 1;
                    break;
                }
                case 'en': {
                    this.elementRef.nativeElement.querySelector('#en_button').style.opacity = 1;
                    break;
                }
            }
        }
    }

    ngOnInit(): void {
    }
}
