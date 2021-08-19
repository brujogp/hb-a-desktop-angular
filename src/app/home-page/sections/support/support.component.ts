import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    sharedOpen(): void {
        console.log('Se abrió el shared');
    }

    sharedClose(): void {
        console.log('Se cerró el shared');
    }
}
