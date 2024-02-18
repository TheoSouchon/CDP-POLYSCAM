import {Component, OnInit} from '@angular/core';
import {Purchase} from "../purchase/purchase.model";
import {PurchaseService} from "../purchase/purchase.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Person} from "../person/person.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-my-purchase',
  templateUrl: './my-purchase.component.html',
  styleUrls: ['./my-purchase.component.css']
})
export class MyPurchaseComponent implements OnInit{
  purchaseList?: Purchase[];
  connectedPersonPurchases? :Purchase[];
  connectedPerson: Person | null | undefined;
  displayedColumns: string[] = ['announceName', 'price', 'dateOrder', 'state', 'actions', 'updateCost'];
  page: number = 1;
  pageSize: number = 10;

  constructor(private purchaseService: PurchaseService,
              private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
      this.getPurchases()
    });


    }
  getPurchases(): void {
    this.purchaseService.getPurchases()
      .subscribe(purchaseList => {
        this.purchaseList = purchaseList.map(purchase => ({
          ...purchase,
          newCost: purchase.cost
        }));
        this.filterAnnouncesForConnectedPerson();
      });
  }


  filterAnnouncesForConnectedPerson(): void {
    if (this.connectedPerson && this.purchaseList) {
      this.connectedPersonPurchases = this.purchaseList.filter(
        purchase => purchase.person?.id === this.connectedPerson?.id
      );
    } else {
      console.log('Conditions non remplies pour le filtrage');
    }
  }
  updateCost(purchase: Purchase, newCost: number): void {
    if (!purchase.id || newCost == null) {
      console.error('Missing purchase ID or new cost');
      return;
    }

    this.purchaseService.partialUpdatePurchase({ cost: newCost, state: 'En attente' }, purchase.id)
      .subscribe({
        next: () => {
          purchase.cost = newCost;
          purchase.state = 'En attente';
          console.log(`Purchase id=${purchase.id} cost updated to ${newCost}, state set to En attente`);
        },
        error: (error) => console.error('Error updating purchase:', error)
      });
  }
  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

}
