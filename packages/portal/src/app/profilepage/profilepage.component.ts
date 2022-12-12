import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../shared/services/user-service/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule]
})
export class ProfilepageComponent implements OnInit {
  title = "Profile User Page"
  user = {
    name: "name",
    avatar: "",

  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser();
    console.log("User: ", this.user);
  }

}
