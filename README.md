# postToP-Discord

**postToP-Discord** is a lightweight plugin for the [postToP](https://github.com/GitDevla/postToP-server) ecosystem that connects to the postToP server to display the currently playing song from YouTube/Youtube Music in Discord via Rich Presence (RPC).

## Features

- Displays the currently playing song in Discord as your Rich Presence status.
- Integrates seamlessly with the postToP server.

## Future Features

- Standalone mode for users without a postToP server.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/GitDevla/postToP-Discord.git
   cd postToP-Discord
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set the connection details for the postToP server in the configuration file (e.g., `.env`).

4. Start the plugin:
   ```bash
   npm start
   ```

## Prerequisites

- A running instance of postToP-server.
- Your own Application on [Discord](https://discord.com/developers/applications).

## Configuration

Make sure to configure the following settings in `.env`:

- **POSTTOP_URL**: The Websocket URL of your postToP server instance.
- **DISCORD_CLIENT_ID**: Your Discord bot's client ID.

Example `.env`:

```ini
POSTTOP_URL=ws://localhost:8000
DISCORD_CLIENT_ID=123456789123456789
```

## Usage

Once installed and running, **postToP-Discord** will automatically pull the currently playing song from your postToP server and display it on your Discord profile.

## License

This project is licensed under the [MIT License](LICENSE).
