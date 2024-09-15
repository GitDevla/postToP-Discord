import ws from "ws";
import { msToHMS } from "./utils";
import { clearActivity, setActivity } from "./discord";
import { ICurrentlyPlaying } from "./currentlyPlaying";

let currentlyPlaying: ICurrentlyPlaying | null = null;

function getTime(data: ICurrentlyPlaying) {
  if (data.status === "PLAYING")
    return Date.now() - data.updatedAt! + data.currentTime! * 1000;
  return data.currentTime! * 1000;
}

export async function startWS() {
  const wsclient = new ws(process.env.POSTTOP_URL!);

  wsclient.on("open", () => {
    console.log("Connected to server");
    wsclient.on("message", (data: any) => {
      const json = JSON.parse(data) as ICurrentlyPlaying;
      currentlyPlaying = json;
      sendToDiscord(currentlyPlaying);
      console.log(json);
    });
  });

  setInterval(() => {
    if (currentlyPlaying) {
      sendToDiscord(currentlyPlaying);
    }
  }, 4000);
}

function generateSeekbar(currentTime: number, length: number) {
  const barChar = "一";
  const circleChar = "◉";
  const totalLength = 9;
  const seekbar = (
    "".padEnd(Math.floor((currentTime / length) * totalLength), barChar) +
    circleChar
  ).padEnd(totalLength, barChar);
  return seekbar;
}

function sendToDiscord(cp: ICurrentlyPlaying | null) {
  if (!cp || !cp.trackName) {
    clearActivity();
    return;
  }
  const {
    trackName,
    artistName,
    cover,
    status,
    length,
    currentTime,
    updatedAt,
  } = cp;
  const timestamp = getTime(cp);
  setActivity({
    //@ts-ignore
    type: 2,
    details: trackName.padEnd(3, "⠀"),
    state: artistName!.replace("- Topic", "").trim(),
    instance: true,
    assets: {
      large_image: cover!.replace("hqdefault.", "mqdefault."),
      large_text: `${msToHMS(timestamp)}⠀${generateSeekbar(
        timestamp,
        length! * 1000
      )}⠀${msToHMS(length! * 1000)}`,
      small_image: status === "PLAYING" ? "play1" : "pause1",
      small_text: status === "PLAYING" ? "Playing" : "Paused",
    },
    buttons: [
      {
        label: "Listen",
        url: "https://music.youtube.com/watch?v=" + cp.watchID,
      },
    ],
  });
}
