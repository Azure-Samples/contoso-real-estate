import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
// you were not importing the button module
import { MatButtonModule } from "@angular/material/button";
import { UserService } from '../shared/services/user-service/user.service';
// I am importing the tabs here
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTabsModule]
})
export class ProfilepageComponent implements OnInit {
  title = "Profile User Page"
  user = {
    name: "name",
    avatar: "",

  }
  // This is just for the example. You can delete.
  longText = `Doloribus magni saepe repellendus non corrupti soluta. Sint ipsa qui laboriosam enim aliquid ullam. Natus dolores aut enim maxime voluptatem incidunt alias voluptatum. Consequatur molestiae dolores eos ut. Dolore suscipit nostrum sint fugiat ipsa provident aut. Dolore minima optio.`;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser();
    console.log("User: ", this.user);
  }

}
