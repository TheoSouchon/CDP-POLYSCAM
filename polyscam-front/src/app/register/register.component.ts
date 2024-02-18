import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SignupInfo} from '../auth/signup-info';
import {PersonService} from "../pages/person/person.service";
import {Person} from "../pages/person/person.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {LoginInfo} from "../auth/login-info";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private authService: AuthService,
              private personService: PersonService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.emailRegex.test(this.form.email)) {
      this.snackBar.open('Adresse e-mail invalide', 'Fermer', {
        duration: 3000
      });
      return;
    }
    this.authService.signUp(new SignupInfo(this.form.email, this.form.password)).subscribe(
      () => {

        this.connectUser();
        this.tokenStorageService.signOut();
        this.snackBar.open('Inscription réussie', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.log('Erreur d\'inscription:', error);
        this.isSignUpFailed = true;
        this.errorMessage = error.error.message;
      }
    );
  }

  connectUser() {
    const loginInfo = new LoginInfo(this.form.email, this.form.password);
    this.authService.attemptAuth(loginInfo).subscribe(
      loginData => {
        if (loginData.accessToken) {
          this.tokenStorageService.saveToken(loginData.accessToken);
        }

        if (loginData.username) {
          this.tokenStorageService.saveUsername(loginData.username);
        }

        if (loginData.authorities) {
          this.tokenStorageService.saveAuthorities(loginData.authorities);
        }
        this.createPerson();
      },
      error => {
        console.log('Erreur lors de la connexion:', error);
      }
    );
  }

  createPerson() {
    const newPerson = new Person(this.form.firstname, this.form.lastname, this.form.email);
    this.personService.addPerson(newPerson).subscribe(
      personData => {
        console.log('Personne créée:', personData);
      },
      error => {
        console.log('Erreur lors de la création de la personne:', error);
      }
    );
  }

}
