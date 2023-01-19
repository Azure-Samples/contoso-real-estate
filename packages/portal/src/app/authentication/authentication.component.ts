import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { WindowService } from '../core/window/window.service';
import { TextBlockComponent } from '../shared/text-block/text-block.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, TextBlockComponent],
  standalone: true,
})
export class AuthenticationComponent implements OnInit {

  redirectURL = "/";

  constructor(private route: ActivatedRoute, private windowService: WindowService) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params["redirectURL"]) {
      this.redirectURL = params["redirectURL"];
    }

  }

  loginWith(provider: string) {
    this.windowService.nativeWindow().location.href = `/.auth/login/${provider}?post_login_redirect_uri=` + this.redirectURL;
  }

  loginWithGithub() {
    this.loginWith("github");
  }

  loginWithGoogle() {
    this.loginWith("google");
  }

  loginWithMicrosoft() {
    this.loginWith("aad");
  }

  loginWithTwitter() {
    this.loginWith("twitter");
  }

  loginWithFacebook() {
    this.loginWith("facebook");
  }

  loginWithLinkedIn() {
    this.loginWith("linkedin");
  }

}
