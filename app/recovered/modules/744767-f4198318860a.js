// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n;
  var r = e.i(973447),
    i = e.i(194672),
    o = e.i(526658),
    s = e.i(775975),
    u = e.i(63794);
  function a(e) {
    return l(e, location.href).href;
  }
  function l(e, n) {
    let { URL: r } = (function () {
      if (!t) {
        let e, n;
        try {
          (((e = document.createElement("iframe")).style.display = "none"),
            document.body.appendChild(e),
            (n = e.contentWindow));
        } catch (e) {
          n = u.P;
        }
        ((t = { URL: n.URL }), null == e || e.remove());
      }
      return t;
    })();
    try {
      return void 0 !== n ? new r(e, n) : new r(e);
    } catch (e) {
      throw Error(`Failed to construct URL: ${String(e)}`);
    }
  }
  (e.s(
    [
      "d",
      0,
      l,
      "z",
      0,
      function (e) {
        let t = l(e).pathname;
        return "/" === t[0] ? t : `/${t}`;
      },
      "f",
      0,
      function (e) {
        try {
          return !!l(e);
        } catch (e) {
          return !1;
        }
      },
      "X",
      0,
      a,
    ],
    141898,
  ),
    e.s(
      [
        "f",
        0,
        function () {
          return (
            n ||
              (n = new o.S((e) => {
                if (!u.P.fetch) return;
                let { stop: t } = (0, r.m)(
                  u.P,
                  "fetch",
                  (t) =>
                    (function (
                      { parameters: e, onPostCall: t, handlingStack: n },
                      r,
                    ) {
                      let [o, u] = e,
                        l = u && u.method;
                      void 0 === l && o instanceof Request && (l = o.method);
                      let c = void 0 !== l ? String(l).toUpperCase() : "GET",
                        d = o instanceof Request ? o.url : a(String(o)),
                        f = {
                          state: "start",
                          init: u,
                          input: o,
                          method: c,
                          startClocks: (0, s.o)(),
                          url: d,
                          handlingStack: n,
                        };
                      (r.notify(f),
                        (e[0] = f.input),
                        (e[1] = f.init),
                        t((e) =>
                          (function (e, t, n) {
                            function r(t) {
                              ((n.state = "resolve"),
                                Object.assign(n, t),
                                e.notify(n));
                            }
                            t.then(
                              (0, i.l)((e) => {
                                r({
                                  response: e,
                                  responseType: e.type,
                                  status: e.status,
                                  isAborted: !1,
                                });
                              }),
                              (0, i.l)((e) => {
                                var t, i;
                                r({
                                  status: 0,
                                  isAborted:
                                    (null ==
                                    (i =
                                      null == (t = n.init) ? void 0 : t.signal)
                                      ? void 0
                                      : i.aborted) ||
                                    (e instanceof DOMException &&
                                      e.code === DOMException.ABORT_ERR),
                                  error: e,
                                });
                              }),
                            );
                          })(r, e, f),
                        ));
                    })(t, e),
                  { computeHandlingStack: !0 },
                );
                return t;
              })),
            n
          );
        },
      ],
      744767,
    ));
};
