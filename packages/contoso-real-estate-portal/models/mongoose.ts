import mongoose from "mongoose";
import { DatabaseConfig } from "../config/appConfig";
import { logger } from "../config/observability";

export const configureMongoose = async (config: DatabaseConfig) => {
    mongoose.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: (_, converted) => {
            converted.id = converted._id;
            delete converted._id;
        }
    });

    try {
        const db = mongoose.connection;
        db.on("connecting", () => logger.info("Mongoose connecting..."));
        db.on("connected", () => logger.info("Mongoose connected successfully!"));
        db.on("disconnecting", () => logger.info("Mongoose disconnecting..."));
        db.on("disconnected", () => logger.info("Mongoose disconnected successfully!"));
        db.on("error", (err: Error) => logger.error("Mongoose database error:", err));

        await mongoose.connect(config.connectionString, { dbName: config.databaseName });
    }
    catch (err) {
        logger.error(`Mongoose database error: ${err}`);
        throw err;
    }
};
