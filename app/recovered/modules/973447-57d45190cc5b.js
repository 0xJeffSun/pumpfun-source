// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(433710),
    n = e.i(194672),
    r = e.i(163981),
    i = e.i(750671);
  e.s([
    "m",
    0,
    function (e, t, o, { computeHandlingStack: s } = {}) {
      let u = e[t];
      if ("function" != typeof u)
        if (!(t in e && t.startsWith("on"))) return { stop: r.z };
        else u = r.z;
      let a = !1,
        l = function () {
          let e;
          if (a) return u.apply(this, arguments);
          let t = Array.from(arguments);
          (0, n.G)(o, null, [
            {
              target: this,
              parameters: t,
              onPostCall: (t) => {
                e = t;
              },
              handlingStack: s ? (0, i.c)("instrumented method") : void 0,
            },
          ]);
          let r = u.apply(this, t);
          return (e && (0, n.G)(e, null, [r]), r);
        };
      return (
        (e[t] = l),
        {
          stop: () => {
            ((a = !0), e[t] === l && (e[t] = u));
          },
        }
      );
    },
    "U",
    0,
    function (e, n, i) {
      let o = Object.getOwnPropertyDescriptor(e, n);
      if (!o || !o.set || !o.configurable) return { stop: r.z };
      let s = r.z,
        u = (e, n) => {
          (0, t.Q)(() => {
            u !== s && i(e, n);
          }, 0);
        },
        a = function (e) {
          (o.set.call(this, e), u(this, e));
        };
      return (
        Object.defineProperty(e, n, { set: a }),
        {
          stop: () => {
            var t;
            ((null == (t = Object.getOwnPropertyDescriptor(e, n))
              ? void 0
              : t.set) === a && Object.defineProperty(e, n, o),
              (u = s));
          },
        }
      );
    },
  ]);
};
