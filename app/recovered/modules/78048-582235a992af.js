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
  let t = (0, r.forwardRef)(
    (
      {
        color: e = "currentColor",
        size: i = 24,
        strokeWidth: t = 2,
        absoluteStrokeWidth: l,
        className: n = "",
        children: s,
        iconNode: c,
        ...d
      },
      p,
    ) =>
      (0, r.createElement)(
        "svg",
        {
          ref: p,
          ...a,
          width: i,
          height: i,
          stroke: e,
          strokeWidth: l ? (24 * Number(t)) / Number(i) : t,
          className: o("lucide", n),
          ...(!s &&
            !((e) => {
              for (let r in e)
                if (r.startsWith("aria-") || "role" === r || "title" === r)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...c.map(([e, i]) => (0, r.createElement)(e, i)),
          ...(Array.isArray(s) ? s : [s]),
        ],
      ),
  );
  e.s(
    [
      "f",
      0,
      (e, a) => {
        let l = (0, r.forwardRef)(({ className: l, ...n }, s) =>
          (0, r.createElement)(t, {
            ref: s,
            iconNode: a,
            className: o(
              `lucide-${i(e)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${e}`,
              l,
            ),
            ...n,
          }),
        );
        return ((l.displayName = i(e)), l);
      },
    ],
    78048,
  );
};
