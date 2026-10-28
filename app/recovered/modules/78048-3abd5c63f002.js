// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386);
  let i = (e) => {
      let r = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, r, i) =>
        i ? i.toUpperCase() : r.toLowerCase(),
      );
      return r.charAt(0).toUpperCase() + r.slice(1);
    },
    o = (...e) =>
      e
        .filter((e, r, i) => !!e && "" !== e.trim() && i.indexOf(e) === r)
        .join(" ")
        .trim();
  var t = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  let a = (0, r.forwardRef)(
    (
      {
        color: e = "currentColor",
        size: i = 24,
        strokeWidth: a = 2,
        absoluteStrokeWidth: n,
        className: l = "",
        children: c,
        iconNode: s,
        ...d
      },
      p,
    ) =>
      (0, r.createElement)(
        "svg",
        {
          ref: p,
          ...t,
          width: i,
          height: i,
          stroke: e,
          strokeWidth: n ? (24 * Number(a)) / Number(i) : a,
          className: o("lucide", l),
          ...(!c &&
            !((e) => {
              for (let r in e)
                if (r.startsWith("aria-") || "role" === r || "title" === r)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...s.map(([e, i]) => (0, r.createElement)(e, i)),
          ...(Array.isArray(c) ? c : [c]),
        ],
      ),
  );
  e.s(
    [
      "f",
      0,
      (e, t) => {
        let n = (0, r.forwardRef)(({ className: n, ...l }, c) =>
          (0, r.createElement)(a, {
            ref: c,
            iconNode: t,
            className: o(
              `lucide-${i(e)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${e}`,
              n,
            ),
            ...l,
          }),
        );
        return ((n.displayName = i(e)), n);
      },
    ],
    78048,
  );
};
