import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CheckUserAgentGuard implements CanActivate {

    constructor() {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
    }
}
