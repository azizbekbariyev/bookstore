import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.label({label:"Book Store"}),
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike("Book Store", {
          prettyPrint: true,
        })
        // winston.format.printf(({level, message, label, timestamp}) => {
        //     return `${timestamp} [${label}] ${level}: ${message}`
        // })
      ),
    }),
    new winston.transports.File({
      filename: "logs/combine.log",
      level:"info",
      format:winston.format.combine(
        winston.format.label({label:"Book Store"}),
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
        filename:"logs/error.log",
        level:"error",
        format:winston.format.combine(
            winston.format.label({label:"Book Store"}),
            winston.format.timestamp(),
            winston.format.json()
        )
    })
  ],
};
