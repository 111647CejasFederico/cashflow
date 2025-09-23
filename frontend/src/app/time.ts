import dayjs from "dayjs";

import "dayjs/locale/en";
import "dayjs/locale/es";

export function setDayjsLocale(lng: string) {
  const base = lng.split("-")[0];
  dayjs.locale(base === "es" ? "es" : "en");
}

export { dayjs };
