import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import "./theme/App.css";

import apiClient from "./api/apiClient";
import { queryClient } from "./app/query";
import { router } from "./app/router";
import i18n from "./app/translation";
import { ConfirmDialog, ToastContainer } from "./components/basics";
import ErrorBoundary from "./components/UXComponents/ErrorBoundary";
import { applyTheme, getTheme } from "./theme/theme";
import { setDayjsLocale } from "./theme/time";

function App() {
  applyTheme(getTheme());
  setDayjsLocale(i18n.language);

  i18n.on("languageChanged", (lng) => {
    apiClient.defaults.headers.common["Accept-Language"] = lng;
    setDayjsLocale(lng);
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
        <ConfirmDialog />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
