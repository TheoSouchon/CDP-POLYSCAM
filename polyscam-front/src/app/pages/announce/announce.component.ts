import {Component, OnInit} from '@angular/core';
import {Announce} from "./announce.model";
import {AnnounceService} from "./announce.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Person} from "../person/person.model";
import {Purchase} from "../purchase/purchase.model";
import {PurchaseService} from "../purchase/purchase.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit{
  announceList?: Announce[];
  connectedPerson: Person | null | undefined;
  noConnectedPersonAnnounces?: Announce[];
  purchaseList?: Purchase[]
  page: number = 1;
  pageSize: number = 10;


  constructor(private announceService: AnnounceService,
              private sharedDataService: SharedDataService,
              private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
      this.getAnnounces();
    });
  }

  getAnnounces(): void {
    this.announceService.getAnnounces()
      .subscribe(announceList => {
        this.announceList = announceList;
        this.getPurchases()
      });
  }

  getPurchases(): void {
    this.purchaseService.getPurchases()
      .subscribe(purchaseList =>{
        this.purchaseList = purchaseList;
    if (this.connectedPerson) {
      this.filterAnnouncesNotCreatedByConnectedPerson();
    }});
  }


  filterAnnouncesNotCreatedByConnectedPerson(): void {
    if (this.connectedPerson && this.announceList && this.purchaseList) {
      this.noConnectedPersonAnnounces = this.announceList.filter(
        announce =>
          announce.person?.id !== this.connectedPerson?.id &&
          !this.isAnnounceLinkedToAcceptedPurchase(announce.id) &&
          !this.isAnnounceLinkedToConnectedPerson(announce.id)
      );
    } else {
      console.log('Conditions non remplies pour le filtrage');
    }
  }

  isAnnounceLinkedToAcceptedPurchase(announceId: number | undefined): boolean {
    return this.purchaseList?.some(purchase =>
      purchase.announce?.id === announceId && purchase.state === 'Accepté'
    ) || false;
  }

  isAnnounceLinkedToConnectedPerson(announceId: number | undefined): boolean {
    return this.purchaseList?.some(purchase =>
      purchase.person?.id === this.connectedPerson?.id && purchase.announce?.id === announceId
    ) || false;
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

}
