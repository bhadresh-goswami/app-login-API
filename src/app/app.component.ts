import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app-login-API';

  IsCardShow = true;

  IsLogin = this.authService.getAccessToken() == null ? true : false;
  token: string | null | undefined;
  constructor(private authService: AuthenticationService) {}
  ngOnInit(): void {
    this.token = this.authService.getAccessToken();
    this.IsCardShow = this.token != null ? true : false;
  }

  LogOut() {
    this.authService.removeAccessToken();
    this.IsLogin = this.authService.getAccessToken() == null ? true : false;
    this.IsCardShow = !this.IsCardShow;
    this.IsLogin = !this.IsLogin;
  }
}
