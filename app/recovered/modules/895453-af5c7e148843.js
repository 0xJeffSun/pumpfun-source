// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
      log: "log",
      debug: "debug",
      info: "info",
      warn: "warn",
      error: "error",
    },
    n = console,
    r = {};
  Object.keys(t).forEach((e) => {
    r[e] = n[e];
  });
  let i = "Datadog Browser SDK:",
    o = {
      debug: r.debug.bind(n, i),
      log: r.log.bind(n, i),
      info: r.info.bind(n, i),
      warn: r.warn.bind(n, i),
      error: r.error.bind(n, i),
    },
    s = "https://docs.datadoghq.com",
    u = `${s}/real_user_monitoring/browser/troubleshooting`;
  e.s([
    "T",
    0,
    t,
    "e",
    0,
    s,
    "y",
    0,
    u,
    "Z",
    0,
    "More details:",
    "s",
    0,
    o,
    "P",
    0,
    n,
    "r",
    0,
    r,
  ]);
};
