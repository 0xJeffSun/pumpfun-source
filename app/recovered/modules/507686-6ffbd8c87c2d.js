// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.e,
    (t.exports = (function () {
      "use strict";
      function e(e) {
        return Number.isInteger(e) && e >= 0;
      }
      function t(e) {
        ((this.name = "ArgumentError"), (this.message = e));
      }
      return function (r, i) {
        if (((i = i || {}), "function" != typeof r))
          throw new t("fetch must be a function");
        if ("object" != typeof i) throw new t("defaults must be an object");
        if (void 0 !== i.retries && !e(i.retries))
          throw new t("retries must be a positive integer");
        if (
          void 0 !== i.retryDelay &&
          !e(i.retryDelay) &&
          "function" != typeof i.retryDelay
        )
          throw new t(
            "retryDelay must be a positive integer or a function returning a positive integer",
          );
        if (
          void 0 !== i.retryOn &&
          !Array.isArray(i.retryOn) &&
          "function" != typeof i.retryOn
        )
          throw new t("retryOn property expects an array or function");
        return (
          (i = Object.assign({ retries: 3, retryDelay: 1e3, retryOn: [] }, i)),
          function (a, n) {
            var s = i.retries,
              o = i.retryDelay,
              d = i.retryOn;
            if (n && void 0 !== n.retries)
              if (e(n.retries)) s = n.retries;
              else throw new t("retries must be a positive integer");
            if (n && void 0 !== n.retryDelay)
              if (e(n.retryDelay) || "function" == typeof n.retryDelay)
                o = n.retryDelay;
              else
                throw new t(
                  "retryDelay must be a positive integer or a function returning a positive integer",
                );
            if (n && n.retryOn)
              if (Array.isArray(n.retryOn) || "function" == typeof n.retryOn)
                d = n.retryOn;
              else throw new t("retryOn property expects an array or function");
            return new Promise(function (e, t) {
              var i = function (i) {
                r(
                  "u" > typeof Request && a instanceof Request ? a.clone() : a,
                  n,
                )
                  .then(function (r) {
                    if (Array.isArray(d) && -1 === d.indexOf(r.status)) e(r);
                    else if ("function" == typeof d)
                      try {
                        return Promise.resolve(d(i, null, r))
                          .then(function (t) {
                            t ? l(i, null, r) : e(r);
                          })
                          .catch(t);
                      } catch (e) {
                        t(e);
                      }
                    else i < s ? l(i, null, r) : e(r);
                  })
                  .catch(function (e) {
                    if ("function" == typeof d)
                      try {
                        Promise.resolve(d(i, e, null))
                          .then(function (r) {
                            r ? l(i, e, null) : t(e);
                          })
                          .catch(function (e) {
                            t(e);
                          });
                      } catch (e) {
                        t(e);
                      }
                    else i < s ? l(i, e, null) : t(e);
                  });
              };
              function l(e, t, r) {
                setTimeout(
                  function () {
                    i(++e);
                  },
                  "function" == typeof o ? o(e, t, r) : o,
                );
              }
              i(0);
            });
          }
        );
      };
    })()));
};
