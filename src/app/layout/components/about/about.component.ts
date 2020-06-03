import { Component, OnInit, Inject } from '@angular/core';

import { ICartProduct } from '../../../cart';
import { CartService } from '../../../shared';
import { LocalStorageService, ConfigOptionsService, IAppConstants } from '../../../core';
import { APP_CONSTANTS, APP_RANDOM_STRING_5 } from '../../../provider-tokens';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    public cartProducts: ICartProduct[];

    constructor(
        private cartService: CartService,
        private localStorage: LocalStorageService,
        private configOptionsService: ConfigOptionsService,
        @Inject(APP_CONSTANTS) private appConstants: IAppConstants,
        @Inject(APP_RANDOM_STRING_5) private randomString: string,
    ) {}

    ngOnInit(): void {
        this.testCartServiceInjection();
        this.testLocalStorage();
        this.testConfigOptionsService();
        this.testConstantsInjection();
        this.testUseFactoryInjection();
    }

    private testCartServiceInjection() {
        if (this.cartService && this.cartService.productsSubject) {
            console.log('CartService injection works');
        } else {
            console.log('CartService injection does not work');
        }
    }

    private testUseFactoryInjection() {
        if (this.randomString && this.randomString.length === 5) {
            console.log('UseFactory injection works');
        } else {
            console.log('UseFactory injection does not works');
        }
    }

    private testConstantsInjection() {
        if (this.appConstants.App === 'TaskManager' && this.appConstants.Ver === '1.0') {
            console.log('Constants injection works');
        } else {
            console.log('Constants injection does not works');
        }
    }

    private testLocalStorage() {
        this.localStorage.setItem('test1', 'test');
        this.localStorage.setItem('test2', { value: 'test' });
        const test1 = this.localStorage.getItem('test1');
        const test2 = this.localStorage.getItem('test2') as { [key: string]: any };

        if (test1 === 'test' && test2 && test2.value === 'test') {
            console.log('LocalStorage injection works');
        } else {
            console.log(`LocalStorage injection does not works`);
        }
    }

    private testConfigOptionsService() {
        this.configOptionsService.setOptions({ id: 'ID', login: 'login' });
        const { id, login, email } = this.configOptionsService.getOptions(['id', 'email', 'login']);
        if (id === 'ID' && login === 'login' && !email) {
            console.log('ConfigureOptionsService injection works');
        } else {
            console.log('ConfigureOptionsService injection does not work');
        }
    }
}
