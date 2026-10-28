// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(750671),
    n = e.i(194672),
    r = e.i(526658),
    i = e.i(411365),
    o = e.i(839476),
    s = e.i(393386),
    u = e.i(775975);
  let a = {
    intervention: "intervention",
    deprecation: "deprecation",
    cspViolation: "csp_violation",
  };
  function l(e) {
    return {
      startClocks: (0, u.o)(),
      source: s.f.REPORT,
      handling: "unhandled",
      ...e,
    };
  }
  function c(e, n, r, i, o) {
    return r
      ? (0, t.n)({
          name: e,
          message: n,
          stack: [
            {
              func: "?",
              url: r,
              line: null != i ? i : void 0,
              column: null != o ? o : void 0,
            },
          ],
        })
      : void 0;
  }
  e.s(
    [
      "$",
      0,
      a,
      "w",
      0,
      function (e, t) {
        var s, u;
        let d = [];
        t.includes(a.cspViolation) &&
          d.push(
            ((s = e),
            new r.S((e) => {
              let { stop: t } = (0, i.W)(
                s,
                document,
                "securitypolicyviolation",
                (t) => {
                  var n;
                  let r;
                  e.notify(
                    ((n = t),
                    (r = `'${n.blockedURI}' blocked by '${n.effectiveDirective}' directive`),
                    l({
                      type: n.effectiveDirective,
                      message: `${a.cspViolation}: ${r}`,
                      originalError: n,
                      csp: { disposition: n.disposition },
                      stack: c(
                        n.effectiveDirective,
                        n.originalPolicy
                          ? `${r} of the policy "${(0, o.C)(n.originalPolicy, 100, "...")}"`
                          : "no policy",
                        n.sourceFile,
                        n.lineNumber,
                        n.columnNumber,
                      ),
                    })),
                  );
                },
              );
              return t;
            })),
          );
        let f = t.filter((e) => e !== a.cspViolation);
        return (
          f.length &&
            d.push(
              ((u = f),
              new r.S((e) => {
                if (!window.ReportingObserver) return;
                let t = (0, n.l)((t, n) =>
                    t.forEach((t) =>
                      e.notify(
                        (function (e) {
                          let { type: t, body: n } = e;
                          return l({
                            type: n.id,
                            message: `${t}: ${n.message}`,
                            originalError: e,
                            stack: c(
                              n.id,
                              n.message,
                              n.sourceFile,
                              n.lineNumber,
                              n.columnNumber,
                            ),
                          });
                        })(t),
                      ),
                    ),
                  ),
                  r = new window.ReportingObserver(t, {
                    types: u,
                    buffered: !0,
                  });
                return (
                  r.observe(),
                  () => {
                    r.disconnect();
                  }
                );
              })),
            ),
          (0, r.R)(...d)
        );
      },
    ],
    812019,
  );
  var d = e.i(484247),
    f = e.i(63794);
  function p() {
    let e =
      window._DATADOG_SYNTHETICS_PUBLIC_ID ||
      (0, d.P)("datadog-synthetics-public-id");
    return "string" == typeof e ? e : void 0;
  }
  function g() {
    let e =
      window._DATADOG_SYNTHETICS_RESULT_ID ||
      (0, d.P)("datadog-synthetics-result-id");
    return "string" == typeof e ? e : void 0;
  }
  e.s(
    [
      "K",
      0,
      g,
      "n",
      0,
      p,
      "P",
      0,
      function () {
        return !!(p() && g());
      },
      "j",
      0,
      function () {
        return (
          !f.Q &&
          !!(
            f.P._DATADOG_SYNTHETICS_INJECTS_RUM ||
            (0, d.P)("datadog-synthetics-injects-rum")
          )
        );
      },
    ],
    513510,
  );
};
