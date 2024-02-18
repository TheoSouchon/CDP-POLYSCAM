import {Component, OnInit} from '@angular/core';
import {Person} from "../person/person.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedDataService} from "../../services/shared-data.service";
import {AnnounceService} from "../announce/announce.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-announce',
  templateUrl: './create-announce.component.html',
  styleUrls: ['./create-announce.component.css']
})
export class CreateAnnounceComponent implements OnInit {
  announceForm: FormGroup;
  connectedPerson: Person | null | undefined;

  constructor(private formBuilder: FormBuilder,
              private sharedDataService: SharedDataService,
              private announceService: AnnounceService,
              private router: Router,
              private snackBar: MatSnackBar,) {

    this.announceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{1,30}$/)]],
      price: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{1,1024}$/)]],

    });
  }

  ngOnInit(): void {
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
    });
  }

  onSubmit(): void {
    if (this.announceForm.valid) {
      const announceData = {
        ...this.announceForm.value,
        person: this.connectedPerson
      };

      this.announceService.addAnnounce(announceData).subscribe(
        () => {
          this.snackBar.open('Annonce créée avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/user']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'annonce', error);

        }
      );
    }
  }

}
