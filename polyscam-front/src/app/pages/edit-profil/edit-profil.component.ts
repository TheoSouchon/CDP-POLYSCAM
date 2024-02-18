import { Component } from '@angular/core';
import { Person } from '../person/person.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { PersonService } from '../person/person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css'],
})
export class EditProfilComponent {
  info: any;
  connectedPerson!: Person;
  profileForm: FormGroup;
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private token: TokenStorageService,
    private sharedDataService: SharedDataService,
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
    };
    this.sharedDataService.connectedPerson$.subscribe((connectedPerson) => {
      this.connectedPerson = connectedPerson!;
      console.log(this.connectedPerson);
    });

    this.profileForm = this.formBuilder.group({
      firstname: [
        this.connectedPerson ? this.connectedPerson.firstname : '',
        Validators.required,
      ],
      lastname: [
        this.connectedPerson ? this.connectedPerson.lastname : '',
        Validators.required,
      ],
      email: [
        this.connectedPerson ? this.connectedPerson.email : '',
        [Validators.required, Validators.pattern(this.emailRegex)],
      ],
    });
  }
  saveInformation() {
    if (this.profileForm.valid) {
      const updates: Partial<Person> = {
        firstname: this.profileForm.value.firstname,
        lastname: this.profileForm.value.lastname,
        email: this.profileForm.value.email,
      };

      if (this.connectedPerson && this.connectedPerson.id !== undefined) {
        this.personService
          .updatePerson(updates, this.connectedPerson.id)
          .subscribe(
            (updatedPerson: Person) => {
              console.log('Profil mis à jour :', updatedPerson);
              this.logout();
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du profil :', error);
            }
          );
      }
    }
  }
  deleteAccount() {
    if (this.connectedPerson && this.connectedPerson.id !== undefined) {
      this.personService.deletePerson(this.connectedPerson.id).subscribe(
        () => {
          console.log('Compte supprimé avec succès');
          this.logout();
        },
        (error) => {
          console.error('Erreur lors de la suppression du compte :', error);
        }
      );
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
