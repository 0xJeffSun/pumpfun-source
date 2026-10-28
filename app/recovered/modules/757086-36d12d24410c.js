// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(311629);
  let i =
      "u" > typeof globalThis
        ? globalThis
        : "u" > typeof self
          ? self
          : "u" > typeof window
            ? window
            : e.g,
    r = i.fetch
      ? (...e) => i.fetch(...e)
      : () => Promise.reject(Error("[ofetch] global.fetch is not supported!")),
    n = i.Headers,
    a = i.AbortController,
    s = (0, t.c)({ fetch: r, Headers: n, AbortController: a });
  e.s(["f", 0, s]);
};
