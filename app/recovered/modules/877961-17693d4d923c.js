// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    return null !== e && ("object" == typeof e || "function" == typeof e);
  }
  var n = new WeakMap();
  async function a(e) {
    let a,
      r = new Promise((r, i) => {
        for (let o of ((a = { reject: i, resolve: r }), e)) {
          if (!t(o)) {
            Promise.resolve(o).then(r, i);
            continue;
          }
          let e = n.get(o);
          void 0 === e
            ? ((e = (function (e) {
                let t = new Set(),
                  n = { deferreds: t, settled: !1 };
                return (
                  Promise.resolve(e).then(
                    (e) => {
                      for (let { resolve: n } of t) n(e);
                      (t.clear(), (n.settled = !0));
                    },
                    (e) => {
                      for (let { reject: n } of t) n(e);
                      (t.clear(), (n.settled = !0));
                    },
                  ),
                  n
                );
              })(o)).deferreds.add(a),
              n.set(o, e))
            : e.settled
              ? Promise.resolve(o).then(r, i)
              : e.deferreds.add(a);
        }
      });
    return await r.finally(() => {
      for (let r of e) t(r) && n.get(r).deferreds.delete(a);
    });
  }
  e.s(["f", 0, a]);
};
