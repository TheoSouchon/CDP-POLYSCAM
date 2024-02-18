import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../pages/person/person.model';
import { Announce } from '../pages/announce/announce.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { PersonService } from '../pages/person/person.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private connectedPersonSource = new BehaviorSubject<Person | null>(null);
  connectedPerson$ = this.connectedPersonSource.asObservable();
  private _selectedAnnounce: Announce | null = null;
  private announceDeletedSource = new BehaviorSubject<number | null>(null);
  announceDeleted$ = this.announceDeletedSource.asObservable();


  constructor(private personService: PersonService, private tokenStorage: TokenStorageService) {}

  get selectedAnnounce(): Announce | null {
    return this._selectedAnnounce;
  }

  set selectedAnnounce(value: Announce | null) {
    this._selectedAnnounce = value;
  }

  updateConnectedPerson(): void {
    const username = this.tokenStorage.getUsername();
    if (username) {
      this.personService.getPersons().subscribe(personList => {
        for (let person of personList) {
          if (username === person.email) {
            this.connectedPersonSource.next(person);
            break;
          }
        }
      });
    }
  }

  announceDeleted(announceId: number | undefined) {
    if(announceId) {
      this.announceDeletedSource.next(announceId);
    }
  }

}
