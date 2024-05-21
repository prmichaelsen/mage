export const logConfig = {
  logLevel: {
    log: true,
    info: true,
    error: true,
    failure: true,
    debug: true,
    warn: true,
    success: true,
  },
};

export const createLogger = (logger: (...args: any[]) => void) => ({
  print: (...msgs: any[]) => {
    logger(...msgs);
  },
  printn: (...msgs: any[]) => {
    logger(...msgs);
    logger();
  },

  log: (...msgs: any[]) => {
    if (logConfig.logLevel.log) {
      logger(...[`[LOG]`, ...msgs]);
    }
  },

  info: (...msgs: any[]) => {
    if (logConfig.logLevel.info) {
      logger(...[`[INFO]`, ...msgs]);
    }
  },

  error: (...msgs: any[]) => {
    if (logConfig.logLevel.error) {
      logger(...[`[ERROR]`, ...msgs]);
    }
  },

  debug: (...msgs: any) => {
    if (logConfig.logLevel.debug) {
      logger(...[`[DEBUG]`, ...msgs]);
    }
  },

  warn: (...msgs: any[]) => {
    if (logConfig.logLevel.warn) {
      logger(...[`[WARN]`, ...msgs]);
    }
  },
});

export type Logger = ReturnType<typeof createLogger>;
