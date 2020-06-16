import { Component, OnInit, Inject } from '@angular/core';

import { ICartProduct } from '../../../cart';
import { IAppConstants } from '../../../core';
import { APP_CONSTANTS, APP_RANDOM_STRING_5 } from '../../../provider-tokens';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    cartProducts: ICartProduct[];

    constructor(
        @Inject(APP_CONSTANTS) private appConstants: IAppConstants,
        @Inject(APP_RANDOM_STRING_5) private randomString: string,
    ) {}

    ngOnInit(): void {
        this.testConstantsInjection();
        this.testUseFactoryInjection();
    }

    private testUseFactoryInjection() {
        if (this.randomString && this.randomString.length === 5) {
            console.log('UseFactory injection works');
        } else {
            console.log('UseFactory injection does not works');
        }
    }

    private testConstantsInjection() {
        if (
            this.appConstants.App === 'TaskManager' &&
            this.appConstants.Ver === '1.0'
        ) {
            console.log('Constants injection works');
        } else {
            console.log('Constants injection does not works');
        }
    }
}
