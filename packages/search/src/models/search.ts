import { Metadata } from "./metadata.js";

export type SearchAnswer = {
  id: string;
  metadata: Metadata;
  score: number;
}

export type SearchStats = {
  time: number;
  total: number;
}

export type SearchResult = {
  answers: SearchAnswer[];
  query: string;
  stats: SearchStats;
  suggestion_token: string;
}
