// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386);
  let i = (r) => {
      let e = r.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, e, i) =>
        i ? i.toUpperCase() : e.toLowerCase(),
      );
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    o = (...r) =>
      r
        .filter((r, e, i) => !!r && "" !== r.trim() && i.indexOf(r) === e)
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
  let a = (0, e.forwardRef)(
    (
      {
        color: r = "currentColor",
        size: i = 24,
        strokeWidth: a = 2,
        absoluteStrokeWidth: n,
        className: l = "",
        children: s,
        iconNode: c,
        ...d
      },
      p,
    ) =>
      (0, e.createElement)(
        "svg",
        {
          ref: p,
          ...t,
          width: i,
          height: i,
          stroke: r,
          strokeWidth: n ? (24 * Number(a)) / Number(i) : a,
          className: o("lucide", l),
          ...(!s &&
            !((r) => {
              for (let e in r)
                if (e.startsWith("aria-") || "role" === e || "title" === e)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...c.map(([r, i]) => (0, e.createElement)(r, i)),
          ...(Array.isArray(s) ? s : [s]),
        ],
      ),
  );
  r.s(
    [
      "f",
      0,
      (r, t) => {
        let n = (0, e.forwardRef)(({ className: n, ...l }, s) =>
          (0, e.createElement)(a, {
            ref: s,
            iconNode: t,
            className: o(
              `lucide-${i(r)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${r}`,
              n,
            ),
            ...l,
          }),
        );
        return ((n.displayName = i(r)), n);
      },
    ],
    78048,
  );
};
