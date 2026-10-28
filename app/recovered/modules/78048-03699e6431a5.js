// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386);
  let o = (e) => {
      let r = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, r, o) =>
        o ? o.toUpperCase() : r.toLowerCase(),
      );
      return r.charAt(0).toUpperCase() + r.slice(1);
    },
    t = (...e) =>
      e
        .filter((e, r, o) => !!e && "" !== e.trim() && o.indexOf(e) === r)
        .join(" ")
        .trim();
  var i = {
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
        size: o = 24,
        strokeWidth: a = 2,
        absoluteStrokeWidth: n,
        className: l = "",
        children: s,
        iconNode: c,
        ...d
      },
      u,
    ) =>
      (0, r.createElement)(
        "svg",
        {
          ref: u,
          ...i,
          width: o,
          height: o,
          stroke: e,
          strokeWidth: n ? (24 * Number(a)) / Number(o) : a,
          className: t("lucide", l),
          ...(!s &&
            !((e) => {
              for (let r in e)
                if (r.startsWith("aria-") || "role" === r || "title" === r)
                  return !0;
            })(d) && { "aria-hidden": "true" }),
          ...d,
        },
        [
          ...c.map(([e, o]) => (0, r.createElement)(e, o)),
          ...(Array.isArray(s) ? s : [s]),
        ],
      ),
  );
  e.s(
    [
      "f",
      0,
      (e, i) => {
        let n = (0, r.forwardRef)(({ className: n, ...l }, s) =>
          (0, r.createElement)(a, {
            ref: s,
            iconNode: i,
            className: t(
              `lucide-${o(e)
                .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                .toLowerCase()}`,
              `lucide-${e}`,
              n,
            ),
            ...l,
          }),
        );
        return ((n.displayName = o(e)), n);
      },
    ],
    78048,
  );
};
