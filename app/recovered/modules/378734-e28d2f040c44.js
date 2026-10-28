// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(565693),
    r = e.i(575272);
  e.s([
    "f",
    0,
    function (e, i = !1, o = !1) {
      let [l, s] = t.useState(e && i ? "idle" : void 0),
        [u, a] = t.useState(e);
      return (
        e && !u && (a(!0), s("starting")),
        e || !u || "ending" === l || o || s("ending"),
        e || u || "ending" !== l || s(void 0),
        (0, n.f)(() => {
          if (!e && u && "ending" !== l && o) {
            let e = r.$.request(() => {
              s("ending");
            });
            return () => {
              r.$.cancel(e);
            };
          }
        }, [e, u, l, o]),
        (0, n.f)(() => {
          if (!e || i) return;
          let t = r.$.request(() => {
            s(void 0);
          });
          return () => {
            r.$.cancel(t);
          };
        }, [i, e]),
        (0, n.f)(() => {
          if (!e || !i) return;
          e && u && "idle" !== l && s("starting");
          let t = r.$.request(() => {
            s("idle");
          });
          return () => {
            r.$.cancel(t);
          };
        }, [i, e, u, s, l]),
        t.useMemo(
          () => ({ mounted: u, setMounted: a, transitionStatus: l }),
          [u, l],
        )
      );
    },
  ]);
};
