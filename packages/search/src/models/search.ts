import { Listing } from "./listing.js";

export type SearchAnswer = {
  id: string;
  listing: Listing;
  score: number;
};

export type SearchStats = {
  time: number;
  total: number;
};

export type SearchResult = {
  answers: SearchAnswer[];
  query: string;
  stats: SearchStats;
  suggestionToken: string;
};
