require("dotenv/config");
const { Server } = require("socket.io");
const { useAzureSocketIO } = require("@azure/web-pubsub-socket.io");

// Add a Web PubSub Option
const wpsOptions = {
    hub: "eio_hub",
    connectionString: process.env.WebPubSubConnectionString
};
console.log(wpsOptions);
const io = new Server(process.env.port || 3000);
useAzureSocketIO(io, wpsOptions);

io.on("connection", (socket) => {
    // receive a message from the client
    socket.on("sendFavourite", (listingTitle) => {
      console.log(`Receive Event sendFavourite, listingId = ${listingTitle}`);
      socket.broadcast.emit("notifyFavourite", listingTitle);
    })

    socket.on("sendCheckout", (listing, from, to) => {
      console.log(`Receive Event sendCheckout, listing =`, listing, `from = ${from}, to = ${to}`);
      socket.broadcast.emit("notifyCheckout", listing, from, to);
    })
});
