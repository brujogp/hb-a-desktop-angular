import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AboutComponent} from './home-page/sections/about/about.component';
import {UsComponent} from './home-page/sections/us/us.component';
import {SupportComponent} from './home-page/sections/support/support.component';
import {HomeSectionComponent} from './home-page/sections/home-section/home-section.component';
import {CheckUserAgentGuard} from './check-user-agent.guard';
import {HBAppComponent} from './heroclixbible-app/components/app/hb.app.component';

const routes: Routes = [
    {
        path: '', component: HomeSectionComponent,
        data: {animation: 'HomePage'}
    },
    {
        path: 'home',
        component: HomeSectionComponent,
        data: {animation: 'HomePage'}
    },
    {path: 'about-heroclixbible', component: AboutComponent},
    {path: 'about-heroclixbible-team', component: UsComponent},
    {path: 'support-project', component: SupportComponent},
    {path: 'app', component: HBAppComponent, data: {animation: 'AppPage'}},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
