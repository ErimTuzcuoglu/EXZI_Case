import WebSocket from 'ws';
import appConfig from '@config/appConfig';

const wss = new WebSocket.Server({port: appConfig.socketPort});

wss.on('connection', (ws, req) => {
  ws.send(JSON.stringify({message: 'Connected to WebSocket Server'}));
  //   const userId = new URLSearchParams(req.url.split('?')[1])?.get('userId');
  //   connections.push(userId ? {userId, ws} : {userId: `guest-${counter++}`, ws});

  ws.on('message', async (message) => {
    const {action, pair} = JSON.parse(message);

    if (action === 'subscribe') {
      await subscriptionCases.addSubscription(userId, pair, dbRepository);
    }

    if (action === 'unsubscribe') {
      await subscriptionCases.removeSubscription(userId, pair, dbRepository);
    }

    const pairs = await subscriptionCases.getSubscriptions(userId, dbRepository);
    ws.send(JSON.stringify({userId, subscriptions: pairs}));
  });

  ws.on('close', () => {
    console.log('WebSocket closed');
    const index = connections.indexOf(ws);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  });
});

console.log('WebSocket server running');