export interface ICurrentlyPlaying {
  watchID?: string;
  trackName?: string;
  artistID?: string;
  artistName?: string;
  cover?: string;
  status?: "PLAYING" | "PAUSED" | "ENDED";
  length?: number;
  currentTime?: number;
  updatedAt?: number;
}
