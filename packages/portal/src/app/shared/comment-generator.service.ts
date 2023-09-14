//import a way to get random numbers

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service a singleton available throughout the app
})
export class CommentGeneratorService {
  //constructor() {}


  private positive = [
    "Great place to stay!",
    "I would recommend this place to anyone!",
    "I had a great time here!😜",
    "I had a great time here!!!",
    "Awesome sunset view; golden!🌄",
    "I would stay here again!",
    "Nice place!",
    "Great location!",
  ];
  private negative = [
    "I would not recommend this place to anyone!",
    "Shower doesnt work🙄",
    "I had a terrible time here!",
    "loudest neighbors ever!",
    "All taps are leaking. Please fix this!🥲",
    "I am fifty-fifty on this place🙂",
    "At your own risk my guy🥺",
  ];
  private users = [
    "John Doe",
    "Christina Brown",
    "Teddy Bishop",
    "Frank Toby",
    "Zack William",
    "Fujita Uankmi",
    "Syllir Synriion",
    "Madison Holtcombe",
    "Gaia Papria Orator",
    "Antonis Koumoundouros",
  ];
  private time = [
    "12/05/2022",
    "13/05/2022",
    "2/05/2022",
    "12/08/2022",
    "1/11/2021",
    "10/01/2021",
    "08/04/2020",
    "1/03/2020",
  ];

  public generateComments(starRating: number): string {
    if (starRating >= 3) {
      return this.positive[Math.floor(Math.random() * (this.positive.length - 1))];
    } else {
      return this.negative[Math.floor(Math.random() * (this.negative.length - 1))];
    }
  }

  public generateCommentor(): string {
    return this.users[Math.floor(Math.random() * (this.users.length - 1))];
  }

  public generateTime(): string {
    return this.time[Math.floor(Math.random() * (this.time.length - 1))];
  }

  public generateLikesDislikes(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
