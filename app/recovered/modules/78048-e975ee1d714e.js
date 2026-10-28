// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let i = (e) => {
      let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, i) =>
        i ? i.toUpperCase() : t.toLowerCase(),
      );
      return t.charAt(0).toUpperCase() + t.slice(1);
    },
    r = (...e) =>
      e
        .filter((e, t, i) => !!e && "" !== e.trim() && i.indexOf(e) === t)
        .join(" ")
        .trim();
  var n = {
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
  let o = (0, t.forwardRef)(
    (
      {
        color: e = "currentColor",
        size: i = 24,
        strokeWidth: o = 2,
        absoluteStrokeWidth: a,
        className: l = "",
        children: s,
        iconNode: c,
        ...d
      },
      h,
    ) =>
      (0, t.createElement)(
        "svg",
        {
          ref: h,
          ...n,
          width: i,
          height: i,
          stroke: e,
          strokeWidth: a ? (24 * Number(o)) / Number(i) : o,
          className: r("lucide", l),
          ...(!s &&
            !((e) => {
              for (let t in e)
                if (t.startsWith("aria-") || "role" === t || "title" === t)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...c.map(([e, i]) => (0, t.createElement)(e, i)),
          ...(Array.isArray(s) ? s : [s]),
        ],
      ),
  );
  e.s(
    [
      "f",
      0,
      (e, n) => {
        let a = (0, t.forwardRef)(({ className: a, ...l }, s) =>
          (0, t.createElement)(o, {
            ref: s,
            iconNode: n,
            className: r(
              `lucide-${i(e)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${e}`,
              a,
            ),
            ...l,
          }),
        );
        return ((a.displayName = i(e)), a);
      },
    ],
    78048,
  );
};
