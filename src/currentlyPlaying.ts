export interface ICurrentlyPlaying {
  userId: number;
  video: Video | null;
  listeningData: ListeningData | null;
}

export interface Video {
  watchID: string;
  title: string;
  artist: Artist;
  duration: number;
  coverImage: string;
  isMusic: IsMusic;
}

export interface Artist {
  name: string;
  handle: string;
}

export interface IsMusic {
  is_music: boolean;
  reviewed: boolean;
}

export interface ListeningData {
  currentTime: number;
  status: VideoStatus;
  updatedAt: string;
}

export enum VideoStatus {
  STARTED = 0,
  PLAYING = 1,
  PAUSED = 2,
  ENDED = 3,
}
