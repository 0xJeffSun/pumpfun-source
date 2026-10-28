// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t,
    r,
    n,
    o = void 0 !== window.document;
  e.s(["f", 0, o], 259506);
  let i = [],
    s = 0,
    a = !1,
    l = () => {
      let l;
      !o ||
        n ||
        r ||
        a ||
        ((s += 1),
        (n = Promise.race([
          e.A(493796).then((e) => {
            var n = (r = e.datadogLogs);
            if (void 0 !== t) {
              let e = t;
              ((t = void 0), n.init(e));
            }
            for (let { level: e, args: t } of i.splice(0)) n.logger[e](...t);
          }),
          new Promise((e, t) => {
            l = setTimeout(() => t(Error("datadog-logs load timed out")), 1e4);
          }),
        ]).then(
          () => {
            clearTimeout(l);
          },
          () => {
            (clearTimeout(l),
              (n = void 0),
              s >= 3 && ((a = !0), (i.length = 0)));
          },
        )));
    },
    u =
      (e) =>
      (...t) => {
        !o ||
          (r
            ? r.logger[e](...t)
            : a ||
              (i.push({ level: e, args: t }),
              i.length > 1024 && i.shift(),
              l()));
      },
    c = {
      init: (e) => {
        if (o) {
          if (r) return void r.init(e);
          ((t = e), l());
        }
      },
      logger: {
        debug: u("debug"),
        info: u("info"),
        warn: u("warn"),
        error: u("error"),
      },
    };
  e.s(["f", 0, c], 658103);
};
