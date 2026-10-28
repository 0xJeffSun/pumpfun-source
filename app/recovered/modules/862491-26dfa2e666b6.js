// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(717473);
  let n = 256;
  function i(e = 11) {
    if (!t || n + e > 512) {
      ((t = ""), (n = 0));
      for (let e = 0; e < 256; e++)
        t += ((256 + 256 * Math.random()) | 0).toString(16).substring(1);
    }
    return t.substring(n, n++ + e);
  }
  function a(e) {
    if ("object" != typeof e || null === e) return !1;
    let t = Object.getPrototypeOf(e);
    return t === Object.prototype || null === t;
  }
  (e.s(["f", 0, i], 351260),
    e.s(
      [
        "y",
        0,
        function (e, t) {
          let r = (r = {}) => t(e, r);
          for (let n of [
            "call",
            "calls",
            "callWithPeriod",
            "estimateGas",
            "prepare",
            "prepareRecipient",
            "predict",
            "simulate",
          ])
            if (Object.hasOwn(t, n)) {
              let i = t[n];
              r[n] = (t = {}) => (1 === i.length ? i(t) : i(e, t));
            }
          for (let e of ["extractEvent", "extractEvents"])
            Object.hasOwn(t, e) && (r[e] = t[e]);
          return r;
        },
        "g",
        0,
        function (e) {
          let {
              batch: t,
              chain: n,
              ccipRead: s,
              dataSuffix: o,
              key: u = "base",
              name: l = "Base Client",
              tokens: c,
              type: f = "base",
            } = e,
            d =
              e.experimental_blockTag ??
              ("number" == typeof n?.experimental_preconfirmationTime
                ? "pending"
                : void 0),
            p = Math.min(
              Math.max(Math.floor((n?.blockTime ?? 12e3) / 2), 500),
              4e3,
            ),
            y = e.pollingInterval ?? p,
            h = e.cacheTime ?? y,
            m = e.account ? (0, r.f)(e.account) : void 0,
            {
              config: g,
              request: b,
              value: w,
            } = e.transport({ account: m, chain: n, pollingInterval: y }),
            v = {
              account: m,
              batch: t,
              cacheTime: h,
              ccipRead: s,
              chain: n,
              dataSuffix: o,
              key: u,
              name: l,
              pollingInterval: y,
              request: b,
              tokens: c,
              transport: { ...g, ...w },
              type: f,
              uid: i(),
              ...(d ? { experimental_blockTag: d } : {}),
            };
          return Object.assign(v, {
            extend: (function e(t) {
              return (r) => {
                let n = r(t);
                for (let e in v) delete n[e];
                let i = { ...t, ...n };
                for (let e in n) {
                  let r = t[e],
                    s = n[e];
                  a(r) && a(s) && (i[e] = { ...r, ...s });
                }
                return Object.assign(i, { extend: e(i) });
              };
            })(v),
          });
        },
      ],
      862491,
    ));
};
