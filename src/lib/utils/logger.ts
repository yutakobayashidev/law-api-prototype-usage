import pino from "pino";
import { format, utcToZonedTime } from "date-fns-tz";

const pinoConfig = {
  formatters: {
    level: (label: string) => {
      return {
        label,
      };
    },
    log: (object: Record<string, unknown>) => {
      return object;
    },
  },
  timestamp: () => {
    const tokyoTimeZone = "Asia/Tokyo";
    const dateInTokyoTimezone = utcToZonedTime(new Date(), tokyoTimeZone);

    const tokyoFormattedTime = format(
      dateInTokyoTimezone,
      "yyyy-MM-dd HH:mm:ss",
      { timeZone: tokyoTimeZone }
    );

    return `,"time":"${tokyoFormattedTime}"`;
  },
};

const logger = pino(pinoConfig);

export default logger;
