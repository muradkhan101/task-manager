import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

function checkStatus(res: Response) {
    if (res.status >= 400) {
        throw res;
    }
    return res;
}

const defaultHeaders: RequestInit = {
    headers: {
        'Content-Type': 'application/json'
    }
};

type AuthFn = (options: RequestInit) => ({});

export class HttpClient {
    constructor(
        private _baseUrl = '',
        private _authFn: AuthFn = () => ({})
    ) { }
    set baseUrl(url: string) { this._baseUrl = url; }
    set authFn (fn: AuthFn) { this._authFn = fn; }
    get<T>(url, options = defaultHeaders): Observable<T> {
        return this.baseFetch<T>(url, {
            ...options,
            method: 'GET'
        });
    }
    post<T>(url, body, options = defaultHeaders): Observable<T> {
        return this.baseFetch<T>(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
    put<T>(url, body, options = defaultHeaders): Observable<T> {
        return this.baseFetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
    delete<T>(url, options = defaultHeaders): Observable<T> {
        return this.baseFetch(url, {
            ...options,
            method: 'DELETE'
        });
    }
    handleError(err: Response): Observable<Response> {
        console.log(`Call to ${err.url} failed`);
        return of(err);
    }
    private baseFetch<T>(url: string, options: RequestInit): Observable<T> {
        console.log(JSON.stringify(this._authFn(options)))
        console.log(JSON.stringify(this._authFn(options)))
        return fromPromise(
            fetch(this._baseUrl + url, {
                ...this._authFn(options),
            }).then(checkStatus)
            .then(res => {
                return options.headers['Content-Type'] === 'application/json'
                    ? res.json()
                    : res.text();
            }).catch(this.handleError)
        ).pipe(catchError(this.handleError));
    }
}

export const http = new HttpClient();
