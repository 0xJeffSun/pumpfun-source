// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526658),
    n = e.i(883589),
    r = e.i(411365);
  let i = {
    HIDDEN: "visibility_hidden",
    UNLOADING: "before_unload",
    PAGEHIDE: "page_hide",
    FROZEN: "page_frozen",
  };
  e.s([
    "C",
    0,
    i,
    "y",
    0,
    function (e) {
      return new t.S((t) => {
        let { stop: n } = (0, r.U)(
            e,
            window,
            ["visibilitychange", "freeze"],
            (e) => {
              "visibilitychange" === e.type &&
              "hidden" === document.visibilityState
                ? t.notify({ reason: i.HIDDEN })
                : "freeze" === e.type && t.notify({ reason: i.FROZEN });
            },
            { capture: !0 },
          ),
          o = (0, r.W)(e, window, "beforeunload", () => {
            t.notify({ reason: i.UNLOADING });
          }).stop;
        return () => {
          (n(), o());
        };
      });
    },
    "e",
    0,
    function (e) {
      return (0, n.k)(i).includes(e);
    },
  ]);
};
