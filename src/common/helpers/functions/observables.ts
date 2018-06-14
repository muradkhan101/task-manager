import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

export const filterOnProperty = (propName: string) =>
    (obs: Observable<any>) =>
        obs.filter(res => res.data && res.data[propName])
            .map(res => res.data[propName]);
