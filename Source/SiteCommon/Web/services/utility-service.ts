﻿import { MainService } from './main-service';

export class UtilityService {
    MS: MainService;

    constructor(mainservice: MainService) {
        this.MS = mainservice;
    }

    Clone(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    GenerateDailyTriggers(): string[] {
        let dailyTriggers: string[] = [];
        for (let i = 0; i < 24; i++) {
            dailyTriggers.push(`${i}:00`);
            dailyTriggers.push(`${i}:30`);
        }
        return dailyTriggers;
    }

    GetQueryParameter(id: any): string {
        var regex = new RegExp('[?&]' + id.replace(/[\[\]]/g, '\\$&') + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(window.location.href);
        return (!results || !results[2])
            ? ''
            : decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    GetQueryParameterFromUrl(name: any, url: any): string {
        var regex = new RegExp('[?&]' + name.replace(/[\[\]]/g, '\\$&') + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        return (!results || !results[2])
            ? ''
            : decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    GetRouteFromUrl(): string {
        let route = '';
        if (window.location.hash) {
            route = window.location.hash.substring(1);
        }
        return route;
    }

    GetUniqueId(characters: number): string {
        return Math.random().toString(36).substr(2, characters + 2);
    }

    GetPropertiesForTelemtry(): any {
        let obj: any = {};
        obj.TemplateName = this.MS.NavigationService.appName;
        obj.FullUrl = window.location.href;
        obj.Origin = window.location.origin;
        obj.Host = window.location.host;
        obj.HostName = window.location.hostname;
        obj.PageNumber = this.MS.NavigationService.index;
        obj.Page = JSON.stringify(this.MS.NavigationService.pages[this.MS.NavigationService.index]);
        obj.RootSource = - this.MS.HttpService.isOnPremise ? 'MSI' : 'WEB';
        return obj;
    }

    HasInternetAccess(): boolean {
        let response = true;
        if (window.navigator && window.navigator.onLine !== null && window.navigator.onLine !== undefined) {
            response = window.navigator.onLine;
        }
        return response;
    }

    Reload(): void {
        if (window && window.location && window.location.reload) {
            window.location.reload();
        }
    }

    extractDomain(username: string): string {
        let usernameSplit: string[] = username.split('\\');
        return usernameSplit[0];
    }

    extractUsername(username: string): string {
        let usernameSplit: string[] = username.split('\\');
        return usernameSplit[1];
    }

    isEdge(): boolean {
        return window && window.navigator && window.navigator.userAgent && /Edge\/\d./i.test(window.navigator.userAgent);
    }

    validateUsername(username: string): string {
        if (username.includes('\\')) {
            return '';
        } else if (username.length > 0) {
            return 'Username must be in <domain>\\<username> or <machinename>\\<username> format.';
        }

        return 'Please enter your username';
    }

    // Add items to the session storage - should use DataStore where possible
    SaveItem(key: any, value: any): void {
        let val = JSON.stringify(value);
        if (window.sessionStorage.getItem(key)) {
            window.sessionStorage.removeItem(key);
        }
        window.sessionStorage.setItem(key, val);
    }

    ClearSessionStorage(): void {
        window.sessionStorage.clear();
    }

    GetItem(key: any): any {
        let item: any = JSON.parse(window.sessionStorage.getItem(key));
        return item;
    }

    RemoveItem(key: any): void {
        window.sessionStorage.removeItem(key);
    }
}