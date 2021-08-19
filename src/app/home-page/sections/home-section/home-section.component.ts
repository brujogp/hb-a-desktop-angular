import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent, RouterLink, RouterLinkActive, RouterModule} from '@angular/router';

@Component({
    selector: 'app-main-section',
    templateUrl: './home-section.component.html',
    styleUrls: ['../../../../assets/auxiliar-global-styles/common-sections-styles.css', './home-section.component.css']
})
export class HomeSectionComponent implements OnInit {

    constructor(private routerNav: Router) {
    }

    ngOnInit(): void {
    }

    public goto(): void {
        this.routerNav.navigate(['app'], {});
    }
}
