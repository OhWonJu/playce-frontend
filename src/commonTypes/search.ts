type Base = {
  thumbnail?: string;
  keyword: string;
  keywordType?: "ARTIST" | "ALBUM" | "TRACK" | "KEYWORD";
};

export type ArtistSearchKeyword = Base & {
  keywordType: "ARTIST";
  tags: Array<string>;
};

export type AlbumSearchKeyword = Base & {
  keywordType: "ALBUM";
  tags: Array<string>;
};

export type TrackSearchKeyword = Base & {
  keywordType: "TRACK";
  tags: Array<string>;
};

export type KeywordSearchKeyword = {
  keyword: string;
  keywordType: "KEYWORD";
};
