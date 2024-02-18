import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Person} from "./person.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personsUrl = 'http://localhost:8080/persons';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET persons from the server */
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }



  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personsUrl, person, httpOptions).pipe(
      tap((personAdded: Person) => this.log(`added person id=${personAdded.id}`)),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.personsUrl}/${id}`;
    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /** DELETE: delete all the persons from the server */
  deletePersons(): Observable<Person> {
    return this.http.delete<Person>(this.personsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted persons`)),
      catchError(this.handleError<Person>('deletePersons'))
    );
  }

  updatePerson(person: Partial<Person>, id: number): Observable<Person> {
    return this.http.patch<Person>(`${this.personsUrl}/${id}`, { ...person }, httpOptions).pipe(
      tap((personUpdated: Person) => this.log(`updated person id=${personUpdated.id}`)),
      catchError(this.handleError<any>('updatePerson'))
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

  /** Log a PersonService message with the MessageService */
  private log(message: string) {
    console.log('PersonService: ' + message);
  }

  /** GET number of persons from the server */
  getPersonsCounter(): Observable<number> {
    const url = `${this.personsUrl}/counter`;
    return this.http.get<number>(url);
  }

  // for automatic update of number of persons in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }



}
