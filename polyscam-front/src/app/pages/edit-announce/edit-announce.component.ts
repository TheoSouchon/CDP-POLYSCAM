import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnounceService} from "../announce/announce.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Announce} from "../announce/announce.model";
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-edit-announce',
  templateUrl: './edit-announce.component.html',
  styleUrls: ['./edit-announce.component.css']
})
export class EditAnnounceComponent implements OnInit {
  announceForm: FormGroup;
  announceId: number = 1;
  selectedAnnounce: Announce | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private announceService: AnnounceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sharedDataService: SharedDataService,
  ) {
    this.announceForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.selectedAnnounce = this.sharedDataService.selectedAnnounce;
    this.route.params.subscribe(params => {
      this.loadAnnounce(this.selectedAnnounce?.id);
    });
    this.announceForm = this.formBuilder.group({
      name: [this.selectedAnnounce ? this.selectedAnnounce.name : '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{1,30}$/)]],
      price: [this.selectedAnnounce ? this.selectedAnnounce.price : '', [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$/)]],
      description: [this.selectedAnnounce ? this.selectedAnnounce.description : '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{1,1024}$/)]],
    });
  }

  loadAnnounce(id: number | undefined): void {
    if (id !== undefined) {
      this.announceService.getAnnounce(id).subscribe(announce => {
        if (announce !== undefined) {
          this.announceForm.patchValue({
            name: announce.name,
            price: announce.price,
            description: announce.description
          });
        }
      });
    }
  }


  onSubmit(): void {
    console.log(this.selectedAnnounce)
    if (this.announceForm.valid) {
      const announceData: Partial<Announce> = this.announceForm.value;
      if (announceData.price != null) {
        announceData.price = Number(announceData.price);
      }
      this.announceService.updateAnnounce(announceData, this.announceId).subscribe(
        () => {
          this.snackBar.open('Annonce modifiée avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/user']);
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'annonce', error);
          this.snackBar.open('Erreur lors de la modification de l\'annonce', 'Fermer', {
            duration: 3000
          });
        }
      );
    }
  }
}
