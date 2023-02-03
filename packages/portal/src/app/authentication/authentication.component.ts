import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../shared/authentication/auth.service";
import { TextBlockComponent } from "../shared/text-block/text-block.component";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, TextBlockComponent],
  standalone: true,
})
export class AuthenticationComponent implements OnInit {
  redirectURL = "/home";

  providers = [
    { name: "GitHub", id: "github" },
    { name: "Google", id: "google" },
    { name: "Microsoft", id: "microsoft" },
    { name: "Twitter", id: "twitter" },
    { name: "Facebook", id: "facebook" },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  async ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params["redirectURL"]) {
      this.redirectURL = params["redirectURL"];
    }

    if (this.isAuthenticated()) {
      this.router.navigate([this.redirectURL]);
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  loginWith(provider: string) {
    return `/.auth/login/${provider}?post_login_redirect_uri=` + this.redirectURL;
  }
}
