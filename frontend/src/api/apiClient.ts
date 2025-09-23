import axios from "axios";

import i18n from "../app/translation";
import { logger } from "../utils/logger";

const log = logger("apiClient");
const isDev = import.meta.env.VITE_ENV === "development";
type WithTs = { __ts?: number };
function getLang(): string {
  return i18n?.language || localStorage.getItem("i18nextLng") || "en";
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": getLang(),
  },
});

// refrescar idioma si cambia en i18n
i18n.on("languageChanged", (lng) => {
  apiClient.defaults.headers.common["Accept-Language"] = lng;
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  const cfg = config as typeof config & WithTs;
  cfg.__ts = Date.now();
  if (isDev) log.info(`[HTTP] → ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (isDev) {
      const cfg = response.config as typeof response.config & WithTs;
      const dt = Date.now() - (cfg.__ts ?? Date.now());
      log.info(`[HTTP] ← ${response.status} ${response.config.url} (${dt}ms)`);
    }
    return response;
  },
  (error) => {
    if (isDev && error.config) {
      const cfg = error.config as typeof error.config & WithTs;
      const dt = Date.now() - (cfg.__ts ?? Date.now());
      const st = error.response?.status ?? "ERR";
      log.warn(`[HTTP] × ${st} ${error.config.url} (${dt}ms)`, error.response?.data);
    }
    if (error.response?.status === 401) window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default apiClient;
