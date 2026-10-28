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
  let a = (0, e.forwardRef)(
    (
      {
        color: r = "currentColor",
        size: o = 24,
        strokeWidth: a = 2,
        absoluteStrokeWidth: l,
        className: n = "",
        children: s,
        iconNode: c,
        ...d
      },
      h,
    ) =>
      (0, e.createElement)(
        "svg",
        {
          ref: h,
          ...t,
          width: o,
          height: o,
          stroke: r,
          strokeWidth: l ? (24 * Number(a)) / Number(o) : a,
          className: i("lucide", n),
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
        let l = (0, e.forwardRef)(({ className: l, ...n }, s) =>
          (0, e.createElement)(a, {
            ref: s,
            iconNode: t,
            className: i(
              `lucide-${o(r)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${r}`,
              l,
            ),
            ...n,
          }),
        );
        return ((l.displayName = o(r)), l);
      },
    ],
    78048,
  );
};
