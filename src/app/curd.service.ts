import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurdService {

  private apiServer = "https://localhost:5001/Events/admin";
  
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
}
  constructor(private httpClient: HttpClient) { }

  create(eve: any): Observable<any> {
    
    console.log(eve.get('Imagefile'), eve);

    return this.httpClient.post<any>(this.apiServer , eve.value, this.headers)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  getAll(): Observable<any> {
    return this.httpClient.get<Event[]>(this.apiServer + '/get', this.headers)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
