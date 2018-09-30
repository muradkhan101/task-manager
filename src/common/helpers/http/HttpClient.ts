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

const defaultOptions: RequestInit = {
    headers: {
        'Content-Type': 'application/json'
    }
};

type AuthFn = (options: RequestInit) => ({});
/**
 * @summary Class wrapper around Fetch API to simplify making AJAX requests
 * @member baseUrl Value to use as start of every AJAX request
 * @member authFn Function that should take in Request Options and return a new set of Request Options with Authorization info included
 * @method baseRoot Resets the baseUrl temporarily to allow you to make requests to any endpoint (resets baseURL after request is made) 
 * @method baseAuth Resets the Authorization function temporarily so Insite authentication info isn't included on requests made to other APIs 
 */
export class HttpClient {
    constructor(
        private _baseUrl = '',
        private _authFn: AuthFn = (options) => options
    ) { }
    
    private state = {
        url: {
            stored: '',
            revert: false
        },
        auth: {
            stored: undefined,
            revert: false,
        },
    }

    set baseUrl(url: string) {
        this._baseUrl = url;
        this.state.url.stored = url;
    }
    set authFn (fn: AuthFn) { this._authFn = fn; }

    get baseRoot() {
        this.baseUrl = '';
        this.state.url.revert = true;
        return this;
    }

    get baseAuth() {
        this.authFn = (options) => options;
        this.state.auth.revert = true;
        return this;
    }
    
    private revertUrl() {
        this.baseUrl = this.state.url.stored;
        this.state.url.revert = false;
    }

    private revertAuthFn() {
        this.authFn = this.state.auth.stored;
        this.state.auth.revert = false;
    }

    get<T>(url, options = defaultOptions): Observable<T> {
        return this.baseFetch<T>(url, {
            ...options,
            method: 'GET'
        });
    }
    post<T>(url, body, options = defaultOptions): Observable<T> {
        return this.baseFetch<T>(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
    put<T>(url, body, options = defaultOptions): Observable<T> {
        return this.baseFetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
    delete<T>(url, options = defaultOptions): Observable<T> {
        return this.baseFetch(url, {
            ...options,
            method: 'DELETE'
        });
    }
    handleError(err: Response): Observable<Response> {
        console.log(`Call to ${err.url} failed`);
        if (this.state.url.revert) {
            this.revertUrl();
        }
        if (this.state.auth.revert) {
            this.revertAuthFn();
        }
        return of(err);
    }
    private baseFetch<T>(url: string, options: RequestInit): Observable<T> {
        return fromPromise(
            fetch(this._baseUrl + url, {
                ...this._authFn(options),
            }).then(checkStatus)
            .then(res => {
                return options.headers['Content-Type'] === 'application/json'
                    ? res.json()
                    : res.text();
            }).catch(this.handleError)
        ).pipe(catchError(this.handleError))
        .map(res => {
            if (this.state.url.revert) {
                this.revertUrl();
            }
            if (this.state.auth.revert) {
                this.revertAuthFn();
            }
            return res;
        });
    }
}

export const http = new HttpClient();
