import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject, signal } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { BookingFormComponent } from "../shared/booking-form/booking-form.component";
import { FavoriteButtonComponent } from "../shared/favorite-button/favorite-button/favorite-button.component";
import { HasRoleDirective } from "../shared/has-role/has-role.directive";
import { ListingDetailComponent } from "../shared/listing-detail/listing-detail.component";
import { ListingService } from "../shared/listing.service";
import { UserRole, UserService } from "../shared/user/user.service";
import { CommentGeneratorService } from '../shared/comment-generator.service';

@Component({
  selector: "app-rentalpage",
  templateUrl: "./rentalpage.component.html",
  styleUrls: ["./rentalpage.component.scss"],
  standalone: true,
  imports: [CommonModule, ListingDetailComponent, BookingFormComponent, HasRoleDirective, FavoriteButtonComponent, MatMenuModule],
})
export class RentalpageComponent implements OnInit {
  userRole: typeof UserRole = UserRole;
  user: User;
  navigation: Navigation | null;
  reviewsMapping: { [k: string]: string } = { "=0": "No reviews", "=1": "1 message", other: "# reviews" };

  listing = signal<Listing>({} as Listing);
  reviewStars = signal<number[]>([]);
  comments = signal<string[]>([]);
  commentors = signal<string[]>([]);
  commentTime = signal<string[]>([]);
  likes = signal<number[]>([]);
  dislikes = signal<number[]>([]);
  isLoading = signal(true);

  private router = inject(Router);
  private listingService = inject(ListingService);
  private userService = inject(UserService);

  @Input('id') listId = '';

  constructor(private commentService: CommentGeneratorService) {
    this.navigation = this.router.getCurrentNavigation();
    this.listing.set(this.navigation?.extras.state?.["listing"] || {});
    this.user = this.navigation?.extras.state?.["user"] || null;
  }

  async ngOnInit() {
    this.user = await this.userService.currentUser();
    if (this.user === null) {
      this.router.navigate(["/login"]);
      return;
    }

    const listing = await this.listingService.getListingById(this.listId);

    if (listing !== undefined) {
      this.listing.set(listing);
      this.isLoading.set(false);
    } else {
      this.router.navigate(["/404"]);
    }


    this.reviewStars.set(Array(5)
      .fill(0)
      .map((x, i) => (i < this.listing().reviews_stars ? 1 : 0)));



    const limit = this.listing().reviews_number > 20 ? 20 : this.listing().reviews_number;

    const commentsArray = Array(limit).fill(0).map(() => this.commentService.generateComments((this.listing().reviews_stars)));
    const commentorsArray = Array(limit).fill(0).map(() => this.commentService.generateCommentor());
    const commentTimeArray = Array(limit).fill(0).map(() => this.commentService.generateTime());
    const likesArray = Array(limit).fill(0).map(() => this.commentService.generateLikesDislikes(100)); // 100 is max sample likes per comment
    const dislikesArray = Array(limit).fill(0).map(() => this.commentService.generateLikesDislikes(40)); // 40 is max sample dislikes per comment

    this.comments.set(commentsArray);
    this.commentors.set(commentorsArray);
    this.commentTime.set(commentTimeArray);
    this.likes.set(likesArray);
    this.dislikes.set(dislikesArray);
  }

  async share(platform: string) {
    await this.listingService.share(platform, this.listing());
  }

  async onRent(reservationDetails: ReservationRequest) {
    try {
      const checkoutSession = await this.listingService.reserve(reservationDetails);
      const sessionURL = new URL(checkoutSession.sessionUrl);
      if (sessionURL.hostname === 'localhost' && window.location.hostname !== 'localhost') {
        // Fix for local testing on Codespaces
        sessionURL.hostname = window.location.hostname;
        sessionURL.port = '';
      }
      console.info('Redirecting to ' + sessionURL);
      window.location.href = sessionURL.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
