import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

interface Config {
  LOGS: {
    LEVEL: string;
    FILEPATH: string;
  };
  SV: {
    PORT: number;
    HOST: string;
    BASEURL: string;
    LIMITOFRESTARS: number;
    CORS: {
      ORIGIN: string;
      METHODS: string;
      CREDENTIALS: boolean;
      ALLOWEDHEADERS: string[];
    };
    HTTPS: {
      KEY: string;
      CERT: string;
    };
    JWT: {
      SECRETKEY: string;
    };
    SWAGGER: {
      SW_URL: string;
    };
    ENV: string;
  };
  DB: {
    USER: string;
    PASSWORD: string;
    NAME: string;
    HOST: string;
    PORT: number;
    DIALECT: string;
    SYNC: boolean;
    SEED_ON_BOOT: boolean;
  };
}

const config: Config = {
  LOGS: {
    LEVEL: env.LOG_LEVEL || "info",
    FILEPATH: env.LOG_FILEPATH || "log/app.log",
  },
  SV: {
    PORT: +(env.PORT || 3000),
    HOST: env.HOST || "localhost",
    BASEURL: env.BASEURL || "http://localhost:",
    LIMITOFRESTARS: +(env.LIMITOFRESTARS || 5),
    CORS: {
      ORIGIN: env.CORS_ORIGIN || "*",
      METHODS: env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
      CREDENTIALS: env.CORS_CREDENTIALS === "true",
      ALLOWEDHEADERS: env.CORS_ALLOWEDHEADERS
        ? env.CORS_ALLOWEDHEADERS.split(",")
        : ["Content-Type", "Authorization"],
    },
    HTTPS: {
      KEY: env.HTTPS_KEY || "undefined",
      CERT: env.HTTPS_CERT || "undefined",
    },
    JWT: {
      SECRETKEY: env.JWT_SECRETKEY || "Secret Key JWT",
    },
    SWAGGER: {
      SW_URL: env.SWAGGER_URL || "api-docs",
    },
    ENV: env.ENV || "production",
  },
  DB: {
    USER: env.DB_USER || "root",
    PASSWORD: env.DB_PASSWORD || "Root123",
    NAME: env.DB_NAME || "gestorgastos",
    HOST: env.DB_HOST || "localhost",
    PORT: +(env.DB_PORT || 3306),
    DIALECT: env.DB_DIALECT || "mysql",
    SYNC: env.SYNC === "true",
    SEED_ON_BOOT: env.SEED_ON_BOOT === "true",
  },
};

export default config;
