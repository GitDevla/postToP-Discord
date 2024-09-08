export function msToHMS(ms: number) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let minutesString = minutes.toString();
  if (minutes < 10) minutesString = `0${minutes}`;

  let seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
  let secondsString = seconds.toString();
  if (seconds < 10) secondsString = `0${seconds}`;

  if (hours < 1) return `${minutesString}:${secondsString}`;

  return `${hours}:${minutesString}:${secondsString}`;
}
