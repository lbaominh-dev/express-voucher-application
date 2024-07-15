import mongoose, { ClientSession } from "mongoose";

type WithTransactionCallBack = (
  session: mongoose.mongo.ClientSession
) => Promise<any>;

const retryOperation = async (
  operation: () => Promise<any>,
  maxRetries = 5,
  delay = 1000
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt < maxRetries) {
        console.log(
          `Retry attempt ${attempt} failed. Retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

const runTransactionWithRetry = async (
  transactionFunc: any,
  session: ClientSession
) =>
  retryOperation(() => {
    try {
      session.startTransaction();
      return transactionFunc();
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  });

const commitTransactionWithRetry = async (session: ClientSession) =>
  retryOperation(() => session.commitTransaction());

export const withTransaction = async (callback: WithTransactionCallBack) => {
  const session = await mongoose.startSession();

  try {
    return await runTransactionWithRetry(async () => {
      const result = await callback(session);
      await commitTransactionWithRetry(session);
      return result;
    }, session);
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};
