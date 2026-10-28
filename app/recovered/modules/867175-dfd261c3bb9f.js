// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(352386),
    s = e.i(54567);
  let i = (e) =>
      `${e?.userId ?? ""}|${e?.address ?? ""}|${e?.username ?? ""}|${e?.profile_image ?? ""}`,
    u = (0, t.createContext)({ authReady: !1, user: void 0 });
  e.s([
    "F",
    0,
    ({ user: e, authReady: o, children: n }) => {
      let a = (0, t.useRef)(e ?? null),
        l = (0, t.useRef)(i(e)),
        c = i(e);
      c !== l.current && ((a.current = e ?? null), (l.current = c));
      let d = a.current,
        v = (0, t.useMemo)(
          () => (
            s.logger.debug(
              "[LivestreamUserProvider] Recalculating LivestreamUserContext value.",
              { user: d, authReady: o },
            ),
            { user: d, authReady: o }
          ),
          [d, o],
        );
      return (0, r.jsx)(u.Provider, { value: v, children: n });
    },
    "X",
    0,
    function () {
      let e = (0, t.useContext)(u);
      if (!e)
        throw Error(
          "useLivestreamUserContext must be used within a LivestreamUserProvider",
        );
      return e;
    },
  ]);
};
