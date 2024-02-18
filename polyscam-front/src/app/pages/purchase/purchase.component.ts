import {Component, OnInit} from '@angular/core';
import {Purchase} from "./purchase.model";
import {PurchaseService} from "./purchase.service";
import {ActivatedRoute} from "@angular/router";
import {Announce} from "../announce/announce.model";
import {AnnounceService} from "../announce/announce.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Person} from "../person/person.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchaseList?: Purchase[];
  announceList?: Announce[];
  announceId!: number;
  purchasesForAnnounce: Purchase[] = [];
  displayedColumns: string[] = ['creator', 'price', 'dateOrder', 'state', 'actions'];
  connectedPerson: Person | null | undefined;
  connectedPersonAnnounces?: Announce[];
  page: number = 1;
  pageSize: number = 10;

  constructor(private purchaseService: PurchaseService,
              private announceService: AnnounceService,
              private route: ActivatedRoute,
              private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
      this.route.params.subscribe(params => {
        this.announceId = params['announceId'];
        this.getPurchases()
        this.getAnnounces()
      });
    });
  }

  getPurchases(): void {
    this.purchaseService.getPurchases()
      .subscribe(purchaseList => {
        this.purchaseList = purchaseList
        this.getPurchasesByAnnounce(this.announceId);
      });
  }

  getAnnounces(): void {
    this.announceService.getAnnounces()
      .subscribe(announceList =>
        this.announceList = announceList);
  }

  getPurchasesByAnnounce(announceId: number): void {
    const announceIdNum = Number(announceId);
    if (this.purchaseList) {
      this.purchasesForAnnounce = this.purchaseList.filter(
        purchase => purchase.announce?.id === announceIdNum
      );
    }
  }

  acceptPurchase(purchase: Purchase): void {
    if (!purchase.id) {
      console.error('Purchase ID is missing');
      return;
    }

    this.purchaseService.partialUpdatePurchase({state: 'Accepté'}, purchase.id)
      .subscribe({
        next: () => {
          purchase.state = 'Accepté';
          console.log(`Purchase id=${purchase.id} accepted`);
          if (purchase.announce?.id != null && purchase.id != null) {
          this.rejectOtherPurchases(purchase.announce.id, purchase.id);}
        },
        error: (error) => console.error('Error updating purchase:', error)
      });
    this.updateAnnounceList();
  }

  rejectPurchase(purchase: Purchase): void {
    if (!purchase.id) {
      console.error('Purchase ID is missing');
      return;
    }

    this.purchaseService.partialUpdatePurchase({state: 'Refusé'}, purchase.id)
      .subscribe({
        next: () => {
          purchase.state = 'Refusé';
          console.log(`Purchase id=${purchase.id} rejected`);
        },
        error: (error) => console.error('Error updating purchase:', error)
      });
    this.updateAnnounceList();
  }

  rejectOtherPurchases(announceId: number, acceptedPurchaseId: number): void {
    this.purchaseList?.forEach(purchase => {
      if (purchase.announce && purchase.announce.id === announceId && purchase.id !== acceptedPurchaseId && purchase.state !== 'Vendu') {
        if (purchase.id != null) {
          this.purchaseService.partialUpdatePurchase({state: 'Vendu'}, purchase.id)
            .subscribe({
              next: () => {
                purchase.state = 'Vendu';
                console.log(`Purchase id=${purchase.id} set to rejected`);
              },
              error: (error) => console.error('Error updating purchase:', error)
            });
        }
      }
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

  updateAnnounceList(): void {
    this.announceService.getAnnounces().subscribe(announceList => {
      this.announceList = announceList;
      this.filterAnnouncesForConnectedPerson();
    });

  }
  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }
}
