import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server, Room } from 'colyseus';

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});

// Create HTTP Server
const server = http.createServer(app);

// Initialize Colyseus Game Server
const gameServer = new Server({
  server,
});

// Define a simple room state schema
class GameRoom extends Room {
  onCreate(options: any) {
    console.log('GameRoom created!', options);

    this.onMessage('move', (client, message) => {
      console.log(`Client ${client.sessionId} sent move:`, message);
    });
  }

  onJoin(client: any, options: any) {
    console.log(`Client ${client.sessionId} joined!`, options);
  }

  onLeave(client: any, consented: boolean) {
    console.log(`Client ${client.sessionId} left! consented=${consented}`);
  }

  onDispose() {
    console.log('GameRoom disposed.');
  }
}

// Register Game Room
gameServer.define('game_room', GameRoom);

// Start listening
gameServer.listen(port);
console.log(`[Game Server] Listening on http://localhost:${port}`);
