export type T_STrack = {
  title: string;
  time: number;
  url: string;
};

export type T_Album = {
  title: string;
  nameEn: string;
  nameKr: string;
  art: string;
  tracks: Array<T_STrack>;
};

export interface AlbumFreeView {
  albumArtURL: string;
  albumCode: string;
  albumInfo: string;
  albumName: string;
  albumType: string;
  artistId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  artist: {
    artistName: string;
  };
}

export interface Track {
  id: string;
  trackNumber: number;
  trackTime: number;
  trackTitle: string;
  trackURL: string;
  artistName: string;
  albumName: string;
  albumArtURL: string;
  albumId: string;
}

export interface AlbumDetail {
  albumArtURL: string;
  albumCode: string;
  albumInfo: string;
  albumName: string;
  albumType: string;
  artist: { artistInfo: string; artistName: string; id: string };
  artistId: string;
  createdAt: string;
  genres: Array<string>;
  id: string;
  tracks: Array<Track>;
  updatedAt: string;
}

export interface QueueFreeView {
  id: string;
  queueThumbNail: Array<string>;
  songCount: number;
  totalPlayTime: number;
  tracks: Array<Track>;
}
