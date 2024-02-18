import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Announce} from "./announce.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {
  private announcesUrl = 'http://localhost:8080/announces';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET announces from the server */
  getAnnounces(): Observable<Announce[]> {
    return this.http.get<Announce[]>(this.announcesUrl);
  }

  /** GET announce by id. Will 404 if id not found */
  getAnnounce(id: number | undefined): Observable<Announce> {
    const url = `${this.announcesUrl}/${id}`;
    return this.http.get<Announce>(url).pipe(
      tap(_ => this.log(`fetched announce id=${id}`)),
      catchError(this.handleError<Announce>(`getAnnounce id=${id}`))
    );
  }



  /** POST: add a new announce to the server */
  addAnnounce(announce: Announce): Observable<Announce> {
    return this.http.post<Announce>(this.announcesUrl, announce, httpOptions).pipe(
      tap((announceAdded: Announce) => this.log(`added announce id=${announceAdded.id}`)),
      catchError(this.handleError<Announce>('addAnnounce'))
    );
  }

  /** DELETE: delete the announce from the server */
  deleteAnnounce(announce: Announce | number): Observable<Announce> {
    const id = typeof announce === 'number' ? announce : announce.id;
    const url = `${this.announcesUrl}/${id}`;
    return this.http.delete<Announce>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted announce id=${id}`)),
      catchError(this.handleError<Announce>('deleteAnnounce'))
    );
  }

  /** DELETE: delete all the announces from the server */
  deleteAnnounces(): Observable<Announce> {
    return this.http.delete<Announce>(this.announcesUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted announces`)),
      catchError(this.handleError<Announce>('deleteAnnounces'))
    );
  }

  updateAnnounce(announce: Partial<Announce>, id: number): Observable<Announce> {
    return this.http.patch<Announce>(`${this.announcesUrl}/${id}`, { ...announce }, httpOptions).pipe(
      tap((announceUpdated: Announce) => {
        this.log(`updated announce id=${announceUpdated.id}`);
      }),
      catchError(this.handleError<any>('updateAnnounce'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AnnounceService message with the MessageService */
  private log(message: string) {
    console.log('AnnounceService: ' + message);
  }

  /** GET number of announces from the server */
  getAnnouncesCounter(): Observable<number> {
    const url = `${this.announcesUrl}/counter`;
    return this.http.get<number>(url);
  }

  // for automatic update of number of announces in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }



}
