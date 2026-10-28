// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(895453);
  e.s(
    [
      "f",
      0,
      function (e, r) {
        r.silentMultipleInit || t.s.error(`${e} is already initialized.`);
      },
    ],
    945937,
  );
  var r = e.i(354878),
    o = e.i(194672);
  e.s(
    [
      "f",
      0,
      function (e, t, r) {
        e.changeObservable.subscribe(() => {
          let o = e.getContext();
          r.add((e) => e[t].setContext(o));
        });
      },
      "i",
      0,
      function (e, t, n, i) {
        return (0, o.l)(
          (...o) => (i && (0, r.x)({ feature: i }), e()[t][n](...o)),
        );
      },
    ],
    141452,
  );
  var n = e.i(526658),
    i = e.i(973447),
    s = e.i(775975),
    a = e.i(305918),
    l = e.i(63794),
    c = e.i(80400),
    u = e.i(393386);
  function g() {
    return new n.S((e) => {
      var t, r;
      let o = (t, r) => {
          let o = (0, c.K)({
            stackTrace: r,
            originalError: t,
            startClocks: (0, s.o)(),
            nonErrorPrefix: "Uncaught",
            source: u.f.SOURCE,
            handling: "unhandled",
          });
          e.notify(o);
        },
        { stop: n } =
          ((t = o),
          (0, i.m)((0, l.K)(), "onerror", ({ parameters: [e, r, o, n, i] }) => {
            let s;
            ((0, c.b)(i) || (s = (0, a.c)(e, r, o, n)),
              t(null != i ? i : e, s));
          })),
        { stop: g } =
          ((r = o),
          (0, i.m)(
            (0, l.K)(),
            "onunhandledrejection",
            ({ parameters: [e] }) => {
              r(e.reason || "Empty reason");
            },
          ));
      return () => {
        (n(), g());
      };
    });
  }
  e.s(
    [
      "f",
      0,
      function (e = g) {
        let t = new n.O(500),
          r = e().subscribe((e) => {
            t.notify({ type: 0, error: e });
          });
        return {
          observable: t,
          stop: () => {
            r.unsubscribe();
          },
        };
      },
    ],
    364682,
  );
  var d = e.i(667611);
  e.s(
    [
      "f",
      0,
      function () {
        let e = [];
        return {
          add: (t) => {
            e.push(t) > 500 && e.splice(0, 1);
          },
          remove: (t) => {
            (0, d.i)(e, t);
          },
          drain: (t) => {
            (e.forEach((e) => e(t)), (e.length = 0));
          },
        };
      },
    ],
    670432,
  );
};
