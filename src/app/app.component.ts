import { Component } from '@angular/core';

import { appTabsConfig } from './app-routing.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    appTabsConfig = appTabsConfig;
}
