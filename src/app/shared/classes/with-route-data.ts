import { WithSubscriptions } from './with-subscriptions';
import { Data, ActivatedRoute } from '@angular/router';

export abstract class WithRouteData extends WithSubscriptions {
    routeData: Data;

    constructor(activeRoute: ActivatedRoute) {
        super();
        activeRoute = activeRoute;
        const activeRouteData$ = activeRoute.data.subscribe(data => {
            this.routeData = data;
        });
        this.subscriptions.push(activeRouteData$);
    }
}
