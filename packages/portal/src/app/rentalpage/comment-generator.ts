//import a way to get random numbers

const positive = [
  "Great place to stay!",
  "I would recommend this place to anyone!",
  "I had a great time here!😜",
  "I had a great time here!!!",
  "Awesome sunset view; golden!🌄",
  "I would stay here again!",
  "Nice place!",
  "Great location!",
];
const negative = [
  "I would not recommend this place to anyone!",
  "Shower doesnt work🙄",
  "I had a terrible time here!",
  "loudest neighbors ever!",
  "All taps are leaking. Please fix this!🥲",
  "I am fifty-fifty on this place🙂",
  "At your own risk my guy🥺",
];
const usersProfilePic = ["🎃", "🎭", "📀", "👻", "🤖", "🐵", "🧌", "🐥", "🐸"];
const users = [
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
const time = [
  "12/05/2022",
  "13/05/2022",
  "2/05/2022",
  "12/08/2022",
  "1/11/2021",
  "10/01/2021",
  "08/04/2020",
  "1/03/2020",
];

export function generateComments(starRating: number): string {
  if (starRating >= 3) {
    return positive[Math.floor(Math.random() * (positive.length - 1))];
  } else {
    return negative[Math.floor(Math.random() * (negative.length - 1))];;
  }
}

export function generateCommentor(): string {
  return users[Math.floor(Math.random() * (users.length - 1))];;
}

export function generateTime(): string {
  return time[Math.floor(Math.random() * (time.length - 1))];;
}

export function randomLikeDislike(max: number): number {
  {
    return Math.floor(Math.random() * max);;
  }
}
