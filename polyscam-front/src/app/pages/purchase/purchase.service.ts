import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Purchase} from "./purchase.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private purchasesUrl = 'http://localhost:8080/purchases';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET purchases from the server */
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchasesUrl);
  }

  /** GET purchase by id. Will 404 if id not found */
  getPurchase(id: number): Observable<Purchase> {
    const url = `${this.purchasesUrl}/${id}`;
    return this.http.get<Purchase>(url).pipe(
      tap(_ => this.log(`fetched purchase id=${id}`)),
      catchError(this.handleError<Purchase>(`getPurchase id=${id}`))
    );
  }

  getPurchasesByAnnounceId(announceId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.purchasesUrl}/purchases/announce/${announceId}`);
  }



  /** POST: add a new purchase to the server */
  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchasesUrl, purchase, httpOptions).pipe(
      tap((purchaseAdded: Purchase) => this.log(`added purchase id=${purchaseAdded.id}`)),
      catchError(this.handleError<Purchase>('addPurchase'))
    );
  }

  /** DELETE: delete the purchase from the server */
  deletePurchase(purchase: Purchase | number): Observable<Purchase> {
    const id = typeof purchase === 'number' ? purchase : purchase.id;
    const url = `${this.purchasesUrl}/${id}`;
    return this.http.delete<Purchase>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted purchase id=${id}`)),
      catchError(this.handleError<Purchase>('deletePurchase'))
    );
  }

  /** DELETE: delete all the purchases from the server */
  deletePurchases(): Observable<Purchase> {
    return this.http.delete<Purchase>(this.purchasesUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted purchases`)),
      catchError(this.handleError<Purchase>('deletePurchases'))
    );
  }

    /** PUT: update the grade on the server */
    updatePurchase(purchase: Purchase, id: number | undefined): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.purchasesUrl}/${id}`, purchase, httpOptions).pipe(
      tap((purchaseUpdated: Purchase) => this.log(`updated purchase id=${purchaseUpdated.id}`)),
      catchError(this.handleError<any>('updatePurchase'))
    );
  }

  /** PATCH: update a purchase partially on the server */
  partialUpdatePurchase(purchase: Partial<Purchase>, id:number):Observable<Purchase> {
    return this.http.patch<Purchase>(`${this.purchasesUrl}/${id}`,purchase,httpOptions).pipe(
      tap((purchasePartialUpdated: Purchase) => this.log(`partial update purchase id=${purchasePartialUpdated.id}`)),
      catchError(this.handleError<any>('partialUpdatePurchase'))
    )
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

  /** Log a PurchaseService message with the MessageService */
  private log(message: string) {
    console.log('PurchaseService: ' + message);
  }

  /** GET number of purchases from the server */
  getPurchasesCounter(): Observable<number> {
    const url = `${this.purchasesUrl}/counter`;
    return this.http.get<number>(url);
  }

  // for automatic update of number of purchases in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }



}
