// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(167236);
  let n = "unknown",
    a = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    i = /^0x[0-9a-fA-F]+$/,
    s = /^\d+$/;
  var o = e.i(376325),
    l = e.i(692198);
  let u =
    ((t = "swap-api"),
    (e, u) => {
      let d = void 0 === u ? globalThis.fetch(e) : globalThis.fetch(e, u),
        c = ((e) => {
          let t,
            r =
              "string" == typeof e
                ? e
                : e instanceof URL
                  ? e.href
                  : "string" == typeof e.url
                    ? e.url
                    : null;
          if (null === r) return n;
          try {
            t = new URL(r, "http://relative.invalid").pathname;
          } catch {
            return n;
          }
          return t
            .split("/")
            .map((e) => (a.test(e) || i.test(e) || s.test(e) ? ":id" : e))
            .join("/");
        })(e);
      return d.then(
        (e) => (r.f.getState().recordSuccess(t, c, Date.now()), e),
        (e) => {
          if ("network" === (0, o.f)(e)) {
            let e = Date.now();
            r.f
              .getState()
              .recordNetworkFailure(t, {
                family: c,
                at: e,
                backgroundChurn: (0, l.O)(e),
                online: "u" < typeof navigator || navigator.onLine,
              });
          }
          throw e;
        },
      );
    });
  e.s(["f", 0, u], 796654);
};
