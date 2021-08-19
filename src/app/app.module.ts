// Importaciones desde el Angular Core
import {BrowserModule} from '@angular/platform-browser';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import {ShareModule} from 'ngx-sharebuttons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgModule} from '@angular/core';
import {ShareButtonModule} from 'ngx-sharebuttons/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CheckUserAgentGuard} from './check-user-agent.guard';

// Importaciones de las páginas
import './icons';
import {BottomMenuComponent} from './home-page/menus/bottom-menu/bottom-menu.component';
import {AboutComponent} from './home-page/sections/about/about.component';
import {UsComponent} from './home-page/sections/us/us.component';
import {SupportComponent} from './home-page/sections/support/support.component';
import {HomeSectionComponent} from './home-page/sections/home-section/home-section.component';
import {HeroclixbibleModule} from './heroclixbible-app/heroclixbible.module';
import {TopNavComponent} from './commons/navs/top-nav/top-nav.component';
import {LanguageListComponent} from './commons/navs/top-nav/language-list/language-list.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {VersionListComponent} from './commons/navs/top-nav/version-list/version-list.component';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        BottomMenuComponent,
        AboutComponent,
        UsComponent,
        SupportComponent,
        HomeSectionComponent,
        TopNavComponent,
        LanguageListComponent,
        VersionListComponent,
    ],
    imports: [
        BrowserModule,
        ShareButtonsModule,
        ShareIconsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HeroclixbibleModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ShareModule,
        ShareButtonModule,
        FontAwesomeModule
    ],
    providers: [CheckUserAgentGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
