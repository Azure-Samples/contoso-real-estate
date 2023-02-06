import mongoose from "mongoose";
import { DatabaseConfig } from "../config/appConfig";
import { logger } from "./observability";

export const configureMongoose = async (config: DatabaseConfig) => {
  try {
    mongoose.set("strictQuery", false);
    const db = mongoose.connection;
    db.on("connecting", () => logger.info("Mongoose connecting..."));
    db.on("connected", () => logger.info("Mongoose connected successfully!"));
    db.on("disconnecting", () => logger.info("Mongoose disconnecting..."));
    db.on("disconnected", () => logger.info("Mongoose disconnected successfully!"));
    db.on("error", (err: Error) => logger.error("Mongoose database error:", err));

    if (db.readyState !== 1) {
      console.log("Mongoose connecting...");
      await mongoose.connect(config.connectionString, { dbName: config.database });
      console.log("Mongoose connected successfully!");
    }
    else {
      console.log("Mongoose already connected! Status:", db.readyState);
    }
  } catch (err) {
    logger.error(`Mongoose database error: ${err}`);
  }
};
