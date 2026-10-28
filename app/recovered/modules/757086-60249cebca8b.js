// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(311629);
  let r =
      "u" > typeof globalThis
        ? globalThis
        : "u" > typeof self
          ? self
          : "u" > typeof window
            ? window
            : e.g,
    n = r.fetch
      ? (...e) => r.fetch(...e)
      : () => Promise.reject(Error("[ofetch] global.fetch is not supported!")),
    a = r.Headers,
    i = r.AbortController,
    o = (0, t.c)({ fetch: n, Headers: a, AbortController: i });
  e.s(["f", 0, o]);
};
