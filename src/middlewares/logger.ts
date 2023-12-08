import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

// Create a write stream (in append mode) for the log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, "../access.log"), { flags: "a" });

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  // Custom middleware to log requests
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  accessLogStream.write(logMessage + "\n");
  next();
};

export default logRequest;
