import mongoose from "mongoose";
import { DB_OPTIONS, DB_URI } from "../../config";

const setupTestDB = (collectionName?: string) => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI, DB_OPTIONS);
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => {
        if (!collectionName || collection.collectionName === collectionName) {
          collection.deleteMany({});
        }
      })
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
