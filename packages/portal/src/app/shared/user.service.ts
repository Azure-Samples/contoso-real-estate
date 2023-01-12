import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  currentUser() {
    return {
      id: "guest",
      name: "Guest",
      avatar: "",
      role: "guest",
    };
  }
}
