import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const now = new Date().toISOString();
  console.log(
    `\x1b[33m[${now}]\x1b[0m \x1b[36m${req.method}\x1b[0m ${req.url}`
  );
  next();
};

export default loggerMiddleware;
