import mongoose from "mongoose";

type WithTransactionCallBack = (session: mongoose.mongo.ClientSession) => Promise<any>;

export const withTransaction = async (callback: WithTransactionCallBack) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await callback(session);
    await session.commitTransaction();

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}
