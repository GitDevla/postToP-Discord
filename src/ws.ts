import ws from "ws";
import { clearActivity, setActivity } from "./discord";
import { ICurrentlyPlaying, VideoStatus } from "./currentlyPlaying";

let currentlyPlaying: ICurrentlyPlaying | null = null;
let elapsedTime = 0;

export async function startWS() {
  const wsclient = new ws(process.env.POSTTOP_URL!);

  wsclient.on("open", () => {
    console.log("Connected to server");
  });

  wsclient.on("message", (data: any) => {
    const { d, op } = JSON.parse(data.toString());

    if (op === 100) {
      // Declare Intent - send handshake
      console.log("Received hello, sending handshake");
      wsclient.send(
        JSON.stringify({
          op: 2,
          d: {
            handle: process.env.HANDLE!,
          },
        })
      );
    } else if (op === 105) {
      // Currently Listening Data
      console.log("Received currently listening data");
      currentlyPlaying = d as ICurrentlyPlaying;

      if (d.listeningData) {
        const timeDiff = new Date().getTime() - new Date(d.listeningData.updatedAt).getTime();
        elapsedTime = timeDiff > 0 ? Math.floor(timeDiff / 1000) : 0;
      }

      sendToDiscord(currentlyPlaying);
      console.log(d);
    }
  });
}

function sendToDiscord(cp: ICurrentlyPlaying | null) {
  if (!cp || !cp.video || !cp.listeningData) {
    clearActivity();
    return;
  }

  const { video, listeningData } = cp;
  const currentTime = listeningData.currentTime + elapsedTime;
  const timestamp = currentTime * 1000;
  const isPlaying = listeningData.status === VideoStatus.PLAYING || listeningData.status === VideoStatus.STARTED;

  setActivity({
    //@ts-ignore
    type: 2,
    details: video.title.padEnd(3, "⠀"),
    state: video.artist.name.replace("- Topic", "").trim(),
    instance: true,
    assets: {
      large_image: video.coverImage.replace("hqdefault.", "mqdefault."),
      // large_text: `${msToHMS(timestamp)}⠀${generateSeekbar(
      //   timestamp,
      //   video.duration * 1000
      // )}⠀${msToHMS(video.duration * 1000)}`,
      small_image: isPlaying ? "play1" : "pause1",
      small_text: isPlaying ? "Playing" : "Paused",
    },
    status_display_type: 2,
    timestamps: {
      start: isPlaying ? Date.now() - currentTime * 1000 : undefined,
      end: isPlaying ? Date.now() + (video.duration * 1000 - timestamp) : undefined,
    },
    buttons: [
      {
        label: "Listen",
        url: "https://music.youtube.com/watch?v=" + video.watchID,
      },
    ],
  });
}
