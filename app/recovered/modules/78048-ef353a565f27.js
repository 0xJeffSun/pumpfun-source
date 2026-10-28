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
  var a = {
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
  let l = (0, e.forwardRef)(
    (
      {
        color: r = "currentColor",
        size: o = 24,
        strokeWidth: l = 2,
        absoluteStrokeWidth: n,
        className: t = "",
        children: c,
        iconNode: s,
        ...d
      },
      v,
    ) =>
      (0, e.createElement)(
        "svg",
        {
          ref: v,
          ...a,
          width: o,
          height: o,
          stroke: r,
          strokeWidth: n ? (24 * Number(l)) / Number(o) : l,
          className: i("lucide", t),
          ...(!c &&
            !((r) => {
              for (let e in r)
                if (e.startsWith("aria-") || "role" === e || "title" === e)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...s.map(([r, o]) => (0, e.createElement)(r, o)),
          ...(Array.isArray(c) ? c : [c]),
        ],
      ),
  );
  r.s(
    [
      "f",
      0,
      (r, a) => {
        let n = (0, e.forwardRef)(({ className: n, ...t }, c) =>
          (0, e.createElement)(l, {
            ref: c,
            iconNode: a,
            className: i(
              `lucide-${o(r)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${r}`,
              n,
            ),
            ...t,
          }),
        );
        return ((n.displayName = o(r)), n);
      },
    ],
    78048,
  );
};
