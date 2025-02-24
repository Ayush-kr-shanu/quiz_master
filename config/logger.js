const winston = require("winston");

// Define log format with colors
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(), // Apply colors
    winston.format.printf(({level, message }) => {
      return `${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log only to console
  ],
});

// Customize colors for different log levels
winston.addColors({
  info: "green",
  warn: "yellow",
  error: "red",
  debug: "magenta",
});

module.exports = logger;