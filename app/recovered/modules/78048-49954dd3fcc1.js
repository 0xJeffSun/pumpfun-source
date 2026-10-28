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
        absoluteStrokeWidth: t,
        className: n = "",
        children: d,
        iconNode: c,
        ...s
      },
      p,
    ) =>
      (0, e.createElement)(
        "svg",
        {
          ref: p,
          ...a,
          width: o,
          height: o,
          stroke: r,
          strokeWidth: t ? (24 * Number(l)) / Number(o) : l,
          className: i("lucide", n),
          ...(!d &&
            !((r) => {
              for (let e in r)
                if (e.startsWith("aria-") || "role" === e || "title" === e)
                  return !0;
            })(s) && { "aria-hidden": "true" }),
          ...s,
        },
        [
          ...c.map(([r, o]) => (0, e.createElement)(r, o)),
          ...(Array.isArray(d) ? d : [d]),
        ],
      ),
  );
  r.s(
    [
      "f",
      0,
      (r, a) => {
        let t = (0, e.forwardRef)(({ className: t, ...n }, d) =>
          (0, e.createElement)(l, {
            ref: d,
            iconNode: a,
            className: i(
              `lucide-${o(r)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${r}`,
              t,
            ),
            ...n,
          }),
        );
        return ((t.displayName = o(r)), t);
      },
    ],
    78048,
  );
};
