import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SharedDataService} from "../services/shared-data.service";
import {Person} from "../pages/person/person.model";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  connectedPerson?: Person | null;

  constructor(private token: TokenStorageService,
              private sharedDataService: SharedDataService) { }


  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.sharedDataService.connectedPerson$.subscribe(connectedPerson => {
      this.connectedPerson = connectedPerson;
    },
      error => {
        console.error('Erreur lors de la récupération de la personne connectée', error);

      });
  }


}
