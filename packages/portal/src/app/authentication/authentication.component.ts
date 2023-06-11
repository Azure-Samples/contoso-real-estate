import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
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
    { name: "Microsoft", id: "microsoft" },
    { name: "Facebook", id: "facebook" },
    { name: "Google", id: "google" },
    { name: "Twitter", id: "twitter" },
    { name: "GitHub", id: "github" },
    { name: "Apple", id: "apple" }
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
