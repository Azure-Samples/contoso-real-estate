import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class UserService {
  user = {};
  // constructor(private httpClient: HttpClient) { }

  //Gets the user data once from the API
  private getUser() {
    // this.httpClient.get("http://localhost:7071/api/users/1").subscribe((data) => {
    //   this.user = data;
    // });

    console.log(this.user)
  }

  //
  currentUser() {
    return {
      id: "guest",
      name: "Guest",
      avatar: ""
    };
  }
}
