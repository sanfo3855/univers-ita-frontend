import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {JWTTokenService} from '../JWT-token/jwt-token.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class BackendApiService {

  private userEndpoint = '/api/user';
  private textSurveyEndpoint = '/api/text-survey';

  constructor(private http: HttpClient,
              private jwtTokenService: JWTTokenService,
              private localStorage: LocalStorageService) {
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  public checkLogin(username: string, password: string): Observable<any> {
    const credentials = {username: undefined, password: undefined};
    credentials.username = username;
    credentials.password = password;
    return this.http.post<any>(this.userEndpoint + '/check', credentials)
      .pipe(catchError(BackendApiService.handleError));
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private jwtTokenService: JWTTokenService,
              private localStorage: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    req = req.clone({headers: req.headers.set('Accept', 'application/json')});
    if (this.jwtTokenService.jwtToken){
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.jwtTokenService.getToken())});
    } else {

    }
    return next.handle(req);
  }
}
