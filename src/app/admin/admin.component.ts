import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';

import { FlexDirection } from '../shared';
import { adminTabsConfig } from './admin.constants';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
    headerLabel: string;
    FlexDirection = FlexDirection;
    isProductListDisplayed: boolean;
    adminTabsConfig = adminTabsConfig;

    constructor() {}

    onActivate({ routeData, ...otherData }: { routeData: Data }) {
        this.headerLabel = routeData.label;
    }
}
