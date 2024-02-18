import { Component } from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";
import {Router} from "@angular/router";
import {SharedDataService} from "./services/shared-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polyscam';
  private roles?: string[];
  authority?: string;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private sharedDataService: SharedDataService
  ) {  }

  ngOnInit() {
    console.log("init");
    if (this.tokenStorage.getToken()) {
      this.sharedDataService.updateConnectedPerson();
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

  }
  logout() {
    this.tokenStorage.signOut();
    this.authority = undefined;
    this.router.navigate(['/home']);
    window.location.reload();
  }


}
