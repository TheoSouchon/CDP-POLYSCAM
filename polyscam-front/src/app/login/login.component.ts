import { Component, OnInit } from '@angular/core';
import {LoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  token?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo?: LoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.tokenStorage.getToken() != null && this.tokenStorage.getToken() != '{}') {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken || '{}');
        this.tokenStorage.saveUsername(data.username || '{}');
        this.tokenStorage.saveAuthorities(data.authorities || []);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.token = this.tokenStorage.getToken();
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/home']).then(() => {
          this.reloadPage()
          this.snackBar.open('Connexion réussie', 'Fermer', {
            duration: 3000
          });
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
