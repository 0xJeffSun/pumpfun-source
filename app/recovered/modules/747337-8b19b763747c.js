// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "https://images.pump.fun",
    n = (e) => {
      try {
        return new URL(e);
      } catch {
        return null;
      }
    },
    r = (e) => {
      let t = n(e);
      return (
        t?.origin === "https://imagedelivery.net" &&
        t.pathname.startsWith("/WL1JOIJiM_NAChp6rtB6Cw/")
      );
    },
    i = ({ url: e, variant: t }) => {
      let n = new URL(e);
      return (n.searchParams.set("variant", t), n.toString());
    };
  e.s([
    "M",
    0,
    ({ id: e, variant: n }) =>
      `${t}/${e
        .split("/")
        .map((e) => encodeURIComponent(e).replace(/%3A/g, ":"))
        .join("/")}?variant=${encodeURIComponent(n)}`,
    "H",
    0,
    r,
    "T",
    0,
    (e) => n(e)?.origin === t,
    "N",
    0,
    (e) => {
      if (!r(e)) return e;
      let n = new URL(e),
        a = n.pathname.split("/").slice(2),
        o = a.pop();
      if (!o || 0 === a.length) return e;
      let s = new URL(`${t}/${a.join("/")}`);
      return (
        (s.search = n.search),
        i({ url: s.toString(), variant: decodeURIComponent(o) })
      );
    },
    "F",
    0,
    i,
  ]);
};
