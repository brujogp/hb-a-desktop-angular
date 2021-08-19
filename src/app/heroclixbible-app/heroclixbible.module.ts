// Módulo aglutinador para los componentes, servicios, pipes, etc, de la aplicación Heroclix
import {NgModule} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';
import {HBAppComponent} from './components/app/hb.app.component';
import {ReplacePipe} from '../pipes/replace.pipe';
import {SurrondWithTagsPipe} from '../pipes/surrond-with-tags.pipe';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        HBAppComponent,
        ReplacePipe,
        SurrondWithTagsPipe
    ],
    imports: [
        MatProgressBarModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule
    ]
})
export class HeroclixbibleModule {
}
