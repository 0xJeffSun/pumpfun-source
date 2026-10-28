// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386);
  let o = (r) => {
      let e = r.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, e, o) =>
        o ? o.toUpperCase() : e.toLowerCase(),
      );
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    i = (...r) =>
      r
        .filter((r, e, o) => !!r && "" !== r.trim() && o.indexOf(r) === e)
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
  let n = (0, e.forwardRef)(
    (
      {
        color: r = "currentColor",
        size: o = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: a,
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
          width: o,
          height: o,
          stroke: r,
          strokeWidth: a ? (24 * Number(n)) / Number(o) : n,
          className: i("lucide", l),
          ...(!s &&
            !((r) => {
              for (let e in r)
                if (e.startsWith("aria-") || "role" === e || "title" === e)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...c.map(([r, o]) => (0, e.createElement)(r, o)),
          ...(Array.isArray(s) ? s : [s]),
        ],
      ),
  );
  r.s(
    [
      "f",
      0,
      (r, t) => {
        let a = (0, e.forwardRef)(({ className: a, ...l }, s) =>
          (0, e.createElement)(n, {
            ref: s,
            iconNode: t,
            className: i(
              `lucide-${o(r)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${r}`,
              a,
            ),
            ...l,
          }),
        );
        return ((a.displayName = o(r)), a);
      },
    ],
    78048,
  );
};
