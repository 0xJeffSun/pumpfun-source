// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = 0,
    r = !1,
    n = 0,
    o = null,
    i = async () => {
      let e = Date.now();
      try {
        let o = await fetch("/api/server-time", {
          cache: "no-store",
          credentials: "omit",
          signal: AbortSignal.timeout(5e3),
        });
        if (!o.ok) throw Error(`server-time ${o.status}`);
        let i = ((e) => {
          if ("object" != typeof e || null === e) return null;
          let { nowMs: t } = e;
          return "number" == typeof t && Number.isFinite(t) ? t : null;
        })(await o.json());
        if (null === i) throw Error("server-time malformed body");
        let s = Date.now(),
          a = i - (e + (s - e) / 2);
        ((t = 5e3 > Math.abs(a) ? 0 : Math.round(a)), (r = !0), (n = s + 9e5));
      } catch {
        n = Date.now() + 6e4;
      }
    };
  e.s([
    "s",
    0,
    () => t,
    "M",
    0,
    () => r,
    "t",
    0,
    () => Date.now() + t,
    "G",
    0,
    () =>
      o ||
      (Date.now() < n
        ? Promise.resolve()
        : (o = i().finally(() => {
            o = null;
          }))),
  ]);
};
