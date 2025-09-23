import { Component, type ReactNode } from "react";

import i18n from "../../app/translation";
import { logger } from "../../utils/logger";

const log = logger("ErrorBoundary");
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // log opcional
    log.error("Uncaught error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h2>{i18n.t("errors.boundaryMessage")}</h2>;
    }
    return this.props.children;
  }
}
