import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "chamkontum";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoDb(): Promise<Db> {
  if (!uri) {
    throw new Error("Missing MONGODB_URI in .env.local");
  }

  const clientPromise =
    global.mongoClientPromise ?? new MongoClient(uri).connect();

  if (process.env.NODE_ENV !== "production") {
    global.mongoClientPromise = clientPromise;
  }

  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}
