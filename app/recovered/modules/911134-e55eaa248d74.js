// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(146695),
    i = e.i(641947),
    l = e.i(572544),
    a = e.i(605587);
  let s = () => (i.A ? "https://pump.fun" : (0, l.f)()),
    n = (e) => `${s()}/coin/${(0, a.c)(e)}`,
    r = ({ mint: e, calloutId: t, replyId: i }) =>
      `${s()}/callouts/${(0, a.c)(e)}/${t}${i ? `/${i}` : ""}`;
  e.s([
    "N",
    0,
    (e) => {
      let t;
      try {
        t = new URL(e, "https://pump.fun").pathname;
      } catch {
        return null;
      }
      let [i, l, a, s, ...n] = t.split("/").filter((e) => "" !== e);
      return "callouts" === i && l && a && !(n.length > 0)
        ? r({ mint: l, calloutId: a, replyId: s })
        : null;
    },
    "S",
    0,
    n,
    "F",
    0,
    ({ mint: e, calloutId: t, holderAddress: i }) =>
      t
        ? r({ mint: e, calloutId: t })
        : i
          ? `${n(e)}?caller=${encodeURIComponent(i)}`
          : null,
    "x",
    0,
    ({ address: e, userId: i }) => {
      let l = (0, t.$)({ address: e, userId: i });
      return l ? `${s()}${l}` : null;
    },
  ]);
};
