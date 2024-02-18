import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../person/person.model";
import {Announce} from "../announce/announce.model";
import {SharedDataService} from "../../services/shared-data.service";
import {PersonService} from "../person/person.service";
import {PurchaseService} from "../purchase/purchase.service";
import {Purchase} from "../purchase/purchase.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {
  purchaseForm: FormGroup;
  connectedPerson: Person | null = null;
  selectedAnnounce: Announce | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    private personService: PersonService,
    private purchaseService: PurchaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.purchaseForm = this.formBuilder.group({
    cost: [this.selectedAnnounce ? this.selectedAnnounce.price : '', Validators.required],
    dateOrder: [new Date(), Validators.required],
    state: ['', Validators.required]
  }); }

  ngOnInit() {
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
    });
    this.selectedAnnounce = this.sharedDataService.selectedAnnounce;

    this.purchaseForm = this.formBuilder.group({
      cost: [this.selectedAnnounce ? this.selectedAnnounce.price : '',
        [Validators.required, Validators.min(1), Validators.max(this.selectedAnnounce ? this.selectedAnnounce.price : Infinity)]],
    });
  }


  onSubmit() {
    if (this.purchaseForm.valid) {
      const costControl = this.purchaseForm.get('cost');

      if (costControl) {
        const purchase = new Purchase(
          costControl.value,
          new Date(),
          'En attente',
          this.connectedPerson,
          this.selectedAnnounce
        );


        this.purchaseService.addPurchase(purchase).subscribe(
          () => {
            this.snackBar.open('Commande créée avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/user']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la commande', error);
          }
        );
      }
    }
  }

  protected readonly Infinity = Infinity;
}
