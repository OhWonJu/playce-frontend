import {
  AlbumSearchKeyword,
  ArtistSearchKeyword,
  KeywordSearchKeyword,
  TrackSearchKeyword,
} from "src/commonTypes/search";

export const curr: Array<KeywordSearchKeyword> = [
  {
    keyword: "newjeans",
    keywordType: "KEYWORD",
  },
  {
    keyword: "adoy",
    keywordType: "KEYWORD",
  },
  {
    keyword: "the1975",
    keywordType: "KEYWORD",
  },
  {
    keyword: "sunset rollercoster",
    keywordType: "KEYWORD",
  },
  {
    keyword: "idll",
    keywordType: "KEYWORD",
  },
  {
    keyword: "george",
    keywordType: "KEYWORD",
  },
  {
    keyword: "grren day",
    keywordType: "KEYWORD",
  },
  {
    keyword: "green day",
    keywordType: "KEYWORD",
  },
  {
    keyword: "gahhh",
    keywordType: "KEYWORD",
  },
  {
    keyword: "LAUV",
    keywordType: "KEYWORD",
  },
  {
    keyword: "LANY",
    keywordType: "KEYWORD",
  },
  {
    keyword: "lee",
    keywordType: "KEYWORD",
  },
];

export const artist: Array<ArtistSearchKeyword> = [
  {
    thumbnail: "test",
    keyword: "The 1975",
    keywordType: "ARTIST",
    tags: ["rock", "pop", "synth pop"],
  },
  {
    thumbnail: "test",
    keyword: "ADOY",
    keywordType: "ARTIST",
    tags: ["kpop", "kindi", "synth pop"],
  },
  {
    thumbnail: "test",
    keyword: "백예린",
    keywordType: "ARTIST",
    tags: ["kpop", "kindi", "R&B"],
  },
];

export const album: Array<AlbumSearchKeyword> = [
  {
    thumbnail: "test",
    keyword: "Our love is  greate",
    keywordType: "ALBUM",
    tags: ["백예린"],
  },
  {
    thumbnail: "test",
    keyword: "A Brief Inquiry into Online Relationships",
    keywordType: "ALBUM",
    tags: ["The 1975"],
  },
  {
    thumbnail: "test",
    keyword: "LOVE",
    keywordType: "ALBUM",
    tags: ["ADOY"],
  },
];

export const track: Array<TrackSearchKeyword> = [
  {
    thumbnail: "test",
    keyword: "지켜줄게",
    keywordType: "TRACK",
    tags: ["백예린", "Our love is greate"],
  },
  {
    thumbnail: "test",
    keyword: "Love It If We Made It",
    keywordType: "TRACK",
    tags: ["The 1975", "A Brief Inquiry into Online Relationships"],
  },
  {
    thumbnail: "test",
    keyword: "Wonder",
    keywordType: "TRACK",
    tags: ["ADOY", "LOVE"],
  },
];
