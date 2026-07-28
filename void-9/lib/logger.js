/**
 * Logger estruturado JSON — VOID-9 Hotmart integration.
 */

function id() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function emit(level, message, meta = {}) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    requestId: meta.requestId || id(),
    ...meta,
  };
  delete entry.stack;
  const line = JSON.stringify(entry);
  if (level === "error" || level === "critical") {
    console.error(line, meta.stack || "");
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.info(line);
  }
  return entry;
}

export const logger = {
  info: (message, meta) => emit("info", message, meta),
  warn: (message, meta) => emit("warn", message, meta),
  error: (message, meta = {}) =>
    emit("error", message, {
      ...meta,
      stack: meta.error?.stack || meta.stack,
      errorMessage: meta.error?.message || meta.errorMessage,
    }),
  critical: (message, meta = {}) =>
    emit("critical", message, {
      ...meta,
      stack: meta.error?.stack || meta.stack,
    }),
  transaction: (message, meta) => emit("info", message, { ...meta, kind: "financial" }),
  webhook: (message, meta) => emit("info", message, { ...meta, kind: "webhook" }),
};

export default logger;
