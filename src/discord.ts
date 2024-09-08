import { Client, Presence } from "discord-rpc";
import { startWS } from "./ws";

const clientId = process.env.DISCORD_CLIENT_ID!;
const client = new Client({
  transport: "ipc",
});

export async function clearActivity() {
  client.clearActivity().catch(console.error);
}

export async function setActivity(data: Presence) {
  // @ts-ignore
  client.request("SET_ACTIVITY", {
    pid: process.pid,
    type: 2,
    activity: data,
  });
}

client.on("ready", () => {
  console.log("[RPC] Hooked!");
  startWS();
});

client.login({ clientId }).catch(console.error);
