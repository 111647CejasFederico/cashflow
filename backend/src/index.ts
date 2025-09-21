import config from "./config/config.ts";
import { dbConnection } from "./config/database.ts";
import registerLog from "./utils/logger.ts";
import routes from "./routes/index.ts";
import swaggerSpec from "./config/swagger.ts";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { i18nMiddleware, initI18n } from "./config/i18n.ts";
import notFound from "./middleware/not-found.ts";
import errorHandler from "./middleware/error-handler.ts";

const log = registerLog("index.ts");
const { CORS, PORT, HOST, BASEURL, LIMITOFRESTARS } = config.SV;
const { SYNC, SEED_ON_BOOT } = config.DB;
let currentRestarts = 0;

const testDBConnection = async () => {
  try {
    await dbConnection
      .authenticate()
      .then(async () => {
        if (SYNC) {
          await dbConnection
            .sync({ alter: true })
            .then(() => {
              log("info", "Database synchronized successfully.");
            })
            .catch((error: unknown) => {
              log("error", "Error synchronizing database:" + error);
            });
        }
        if (SEED_ON_BOOT) {
          // Agregar la lógica para sembrar datos iniciales si es necesario
        }
      })
      .catch((error: unknown) => {
        log("error", "Error connecting to the database:" + error);
      });
  } catch (error: unknown) {
    log("error", "Unable to connect to the database:" + error);
  }
};

const initServer = async () => {
  const app = express();

  await initI18n();

  app.use(
    cors({
      origin: CORS.ORIGIN,
      methods: CORS.METHODS,
      credentials: CORS.CREDENTIALS,
      allowedHeaders: CORS.ALLOWEDHEADERS,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.on("finish", () => log("debug", res.statusCode + " " + req.method + " " + req.originalUrl));
    next();
  });

  app.use(i18nMiddleware);

  app.get("/test-i18n", (req, res) => {
    res.json({
      language: (req as any).language,
      languages: (req as any).languages,
      ok_dot: (req as any).t("common.ok"),
      ok_ns: (req as any).t("common:ok"),
      nf_dot: (req as any).t("errors.notFound"),
      nf_ns: (req as any).t("errors:notFound"),
    });
  });
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, HOST, async () => {
    await testDBConnection()
      .then(() => {
        log("ok", "I18N initialization complete.");
        log("ok", "Database connection has been established successfully.");
        log("ok", `Server is running at ${BASEURL}${PORT}/api`);
        log("ok", `Swagger UI is available at ${BASEURL}${PORT}/api-docs`);
        log(
          "info",
          "CORS settings: " +
            JSON.stringify({
              origin: CORS.ORIGIN,
              allowedHeaders: CORS.ALLOWEDHEADERS,
            })
        );
      })
      .catch((error) => {
        log("error", "Error starting server:" + error);
        process.exitCode = 1;
        currentRestarts++;
        if (currentRestarts < LIMITOFRESTARS) {
          log("warn", `Reiniciando servidor... (${currentRestarts}/${LIMITOFRESTARS})`);
          void initServer();
        }
      });
  });
};
void initServer();
