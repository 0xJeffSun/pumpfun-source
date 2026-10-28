// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(973447),
    r = e.i(526658),
    i = e.i(775975),
    o = e.i(141898),
    s = e.i(70296),
    u = e.i(411365);
  let a = new WeakMap();
  function l({ target: e, parameters: [t, n] }) {
    a.set(e, {
      state: "open",
      method: String(t).toUpperCase(),
      url: (0, o.X)(String(n)),
    });
  }
  function c({ target: e }) {
    let t = a.get(e);
    t && (t.isAborted = !0);
  }
  e.s([
    "f",
    0,
    function (e) {
      var o;
      return (
        t ||
          ((o = e),
          (t = new r.S((e) => {
            let { stop: t } = (0, n.m)(XMLHttpRequest.prototype, "open", l),
              { stop: r } = (0, n.m)(
                XMLHttpRequest.prototype,
                "send",
                (t) => {
                  !(function (
                    { target: e, parameters: [t], handlingStack: r },
                    o,
                    l,
                  ) {
                    let c = a.get(e);
                    if (!c) return;
                    ((c.state = "start"),
                      (c.startClocks = (0, i.o)()),
                      (c.isAborted = !1),
                      (c.xhr = e),
                      (c.handlingStack = r),
                      (c.body = t));
                    let d = !1,
                      { stop: f } = (0, n.m)(e, "onreadystatechange", () => {
                        e.readyState === XMLHttpRequest.DONE && p();
                      }),
                      p = () => {
                        (g(),
                          f(),
                          d ||
                            ((d = !0),
                            (c.state = "complete"),
                            (c.duration = (0, i.G)(
                              c.startClocks.timeStamp,
                              (0, i.J)(),
                            )),
                            (c.status = e.status),
                            l.notify((0, s.P)(c))));
                      },
                      { stop: g } = (0, u.W)(o, e, "loadend", p);
                    l.notify(c);
                  })(t, o, e);
                },
                { computeHandlingStack: !0 },
              ),
              { stop: d } = (0, n.m)(XMLHttpRequest.prototype, "abort", c);
            return () => {
              (t(), r(), d());
            };
          }))),
        t
      );
    },
  ]);
};
