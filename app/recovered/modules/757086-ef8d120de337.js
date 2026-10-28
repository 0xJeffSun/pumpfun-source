// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(311629);
  let n =
      "u" > typeof globalThis
        ? globalThis
        : "u" > typeof self
          ? self
          : "u" > typeof window
            ? window
            : e.g,
    r = n.fetch
      ? (...e) => n.fetch(...e)
      : () => Promise.reject(Error("[ofetch] global.fetch is not supported!")),
    a = n.Headers,
    i = n.AbortController,
    o = (0, t.c)({ fetch: r, Headers: a, AbortController: i });
  e.s(["f", 0, o]);
};
