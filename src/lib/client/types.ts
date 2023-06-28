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
