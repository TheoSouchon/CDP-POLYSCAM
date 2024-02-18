import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {PersonService} from "../person/person.service";
import {Person} from "../person/person.model";
import {Announce} from "../announce/announce.model";
import {AnnounceService} from "../announce/announce.service";
import {SharedDataService} from "../../services/shared-data.service";
import {PurchaseService} from "../purchase/purchase.service";
import {Purchase} from "../purchase/purchase.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit{
  personList?: Person[];
  connectedPerson: Person | null | undefined;
  announceList?: Announce[];
  connectedPersonAnnounces?: Announce[];
  purchaseList?: Purchase[];
  page: number = 1;
  pageSize: number =10;

  constructor(
    private tokenStorageService: TokenStorageService,
    private personService: PersonService,
    private announceService: AnnounceService,
    private sharedDataService: SharedDataService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    this.getPersons()
    this.getAnnounces()
    this.getPurchases()
    this.sharedDataService.announceDeleted$.subscribe(announceId => {
      if (announceId) {
        this.announceList = this.announceList?.filter(announce => announce.id !== announceId);
        this.filterAnnouncesForConnectedPerson();
      }
    });
  }

  getPersons(): void {
    this.personService.getPersons().subscribe(personList => {
      this.personList = personList;
      this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
        this.connectedPerson = connectedPerson;
      });
      if (this.announceList) {
        this.filterAnnouncesForConnectedPerson();
      }
    });
  }

  getAnnounces(): void {
    this.announceService.getAnnounces().subscribe(announceList => {
      this.announceList = announceList;
      if (this.connectedPerson) {
        this.filterAnnouncesForConnectedPerson();
      }
    });
  }

  getPurchases(): void {
    this.purchaseService.getPurchases().subscribe(purchaseList => {
      this.purchaseList = purchaseList;
    });
  }


  filterAnnouncesForConnectedPerson(): void {
    if (this.connectedPerson && this.announceList) {
      this.connectedPersonAnnounces = this.announceList.filter(
        announce => announce.person?.id === this.connectedPerson?.id
      );
    } else {
      console.log('Conditions non remplies pour le filtrage');
    }
  }

  isAnnounceLinkedToPurchase(announceId: number | undefined): boolean {
    return this.purchaseList?.some(purchase => purchase.announce?.id === announceId) || false;
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

}
