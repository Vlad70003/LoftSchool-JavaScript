let http = require('http');
let Index = require('ws');

let server = http.createServer(async (req, res) => {
  res.end('ok');
});
let wss = new Index.Server({ server });
let connections = new Map();

wss.on('connection', (socket) => {
  connections.set(socket, {});

  socket.on('message', (messageData) => {
    let message = JSON.parse(messageData);
    let excludeItself = false;

    if (message.type === 'hello') {
      excludeItself = true;
      connections.get(socket).userName = message.data.name;
      sendMessageTo(
        {
          type: 'user-list',
          data: [...connections.values()].map((item) => item.userName).filter(Boolean),
        },
        socket
      );
    }

    sendMessageFrom(connections, message, socket, excludeItself);
  });

  socket.on('close', () => {
    sendMessageFrom(connections, { type: 'bye-bye' }, socket);
    connections.delete(socket);
  });
});

function sendMessageTo(message, to) {
  to.send(JSON.stringify(message));
}

function sendMessageFrom(connections, message, from, excludeSelf) {
  const socketData = connections.get(from);

  if (!socketData) {
    return;
  }

  message.from = socketData.userName;

  for (const connection of connections.keys()) {
    if (connection === from && excludeSelf) {
      continue;
    }

    connection.send(JSON.stringify(message));
  }
}

server.listen(8282);