import { Server } from "socket.io";
import { useAzureSocketIO } from "@azure/web-pubsub-socket.io";
import dotenv from "dotenv";

dotenv.config();

if (process.env.SERVICE_WEB_PUBSUB_CONNECTION_STRING === undefined) {
  console.log("*** Error: Missing configuration. ***")
  console.log("SERVICE_WEB_PUBSUB_CONNECTION_STRING is not set");
  console.log("Please read ./packages/notifications/README.md for how to set up the project.");
  console.log("*******************************");
  process.exit(0);
}


// Add a Web PubSub Option
const wpsOptions = {
  hub: "Hub",
  connectionString: process.env.SERVICE_WEB_PUBSUB_CONNECTION_STRING
};
const port = process.env.SERVICE_WEB_PUBSUB_PORT || 4300;
const io = new Server(port);
useAzureSocketIO(io, wpsOptions);

console.log("Socket server is running on 127.0.0.1:%s", port);

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
