﻿/// <reference path="../scripts/ai.1.0.0-build00159.d.ts" />

import { MainService } from './main-service';

export class LoggerService {
    MS: MainService;
    appInsights: Microsoft.ApplicationInsights.AppInsights;
    UserGenId: string;
    OperationId: string;
    UserId: string;
    SessionId: string;

    constructor(MainService: MainService) {
        this.MS = MainService;
        var snippet: any = {
            config: {
                instrumentationKey: '74bc59f2-6526-41b1-ab84-370532ec5d42'
            }
        };

        var init = new Microsoft.ApplicationInsights.Initialization(snippet);
        var applicationInsights = init.loadAppInsights();
        this.appInsights = applicationInsights;

        this.UserGenId = this.MS.UtilityService.GetItem('UserGeneratedId');
        this.SessionId = applicationInsights.context.session.id;
        this.UserId = applicationInsights.context.user.id;
        this.OperationId = applicationInsights.context.operation.id;
    }

    TrackStartRequest(request: any, uniqueId: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.Request = request;
        properties.UniqueId = uniqueId;
        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-StartRequest-' + request, properties);
        this.appInsights.flush();
    }

    TrackEndRequest(request: any, uniqueId: any, isSucess: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.Request = request;
        properties.UniqueId = uniqueId;
        properties.Sucess = isSucess;
        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-EndRequest-' + request, properties);
        this.appInsights.flush();
    }

    TrackEvent(requestName: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-' + requestName, properties);
        this.appInsights.flush();
    }

    TrackDeploymentStepStartEvent(deploymentIndex: any, deploymentName: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.DeploymentIndex = deploymentIndex;
        properties.DeploymentName = deploymentName;
        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-' + deploymentName + '-Start-' + deploymentIndex, properties);
        this.appInsights.flush();
    }

    TrackDeploymentStepStoptEvent(deploymentIndex: any, deploymentName: any, isSuccess: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.DeploymentIndex = deploymentIndex;
        properties.DeploymentName = deploymentName;
        properties.TemplateName = this.MS.NavigationService.appName;
        properties.Sucess = isSuccess;
        this.appInsights.trackEvent('UI-' + deploymentName + '-End-' + deploymentIndex, properties);
        this.appInsights.flush();
    }

    TrackDeploymentStart(): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;

        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-DeploymentStart', properties);
        this.appInsights.flush();
    }

    TrackUninstallStart(): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;

        properties.TemplateName = this.MS.NavigationService.appName;
        this.appInsights.trackEvent('UI-UninstallStart', properties);
        this.appInsights.flush();
    }

    TrackUninstallEnd(isSuccess: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.TemplateName = this.MS.NavigationService.appName;
        properties.Sucess = isSuccess;
        this.appInsights.trackEvent('UI-UninstallEnd', properties);
        this.appInsights.flush();
    }

    TrackDeploymentEnd(isSucess: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        properties.UserGenId = this.UserGenId;
        properties.SessionId = this.SessionId;
        properties.UserId = this.UserId;
        properties.OperationId = this.OperationId;
        properties.TemplateName = this.MS.NavigationService.appName;
        properties.Sucess = isSucess;
        this.appInsights.trackEvent('UI-DeploymentEnd', properties);
        this.appInsights.flush();
    }

    GetPropertiesForTelemtry(): any {
        let obj: any = {};
        obj.AppName = this.MS.NavigationService.appName;
        obj.FullUrl = window.location.href;
        obj.Origin = window.location.origin;
        obj.Host = window.location.host;
        obj.HostName = window.location.hostname;
        obj.PageNumber = this.MS.NavigationService.index;
        if (this.MS.NavigationService.getCurrentSelectedPage()) {
            obj.Route = this.MS.NavigationService.getCurrentSelectedPage().RoutePageName;
            obj.PageName = this.MS.NavigationService.getCurrentSelectedPage().PageName;
            obj.PageModuleId = this.MS.NavigationService.getCurrentSelectedPage().Path.replace(/\\/g, "/");
            obj.PageDisplayName = this.MS.NavigationService.getCurrentSelectedPage().DisplayName;
        }

        obj.RootSource = - this.MS.HttpService.isOnPremise ? 'MSI' : 'WEB';
        return obj;
    }

    TrackPageView(page: any, url: any): void {
        let properties: any = this.GetPropertiesForTelemtry();
        this.appInsights.trackPageView(page, url, properties);
        this.appInsights.flush();
    }

    TrackTrace(trace: string): void {
        this.appInsights.trackTrace('UI-' + trace);
        this.appInsights.flush();
    }
}