// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(565693),
    r = e.i(234006),
    i = e.i(443589),
    o = e.i(732486);
  let l = t.forwardRef(function (e, l) {
    let [s, u] = t.useState();
    return (
      (0, n.f)(() => {
        r.G && u("button");
      }, []),
      (0, o.jsx)("span", {
        ...e,
        ref: l,
        style: i.p,
        "aria-hidden": !s || void 0,
        ...{ tabIndex: 0, role: s },
        "data-base-ui-focus-guard": "",
      })
    );
  });
  e.s(["f", 0, l], 62819);
  var s = e.i(996972),
    u = e.i(226115),
    a = e.i(430186);
  let c = () => ({
    getShadowRoot: !0,
    displayCheck:
      "function" == typeof ResizeObserver &&
      ResizeObserver.toString().includes("[native code]")
        ? "full"
        : "none",
  });
  function f(e, t) {
    let n = (0, s.T)(e, c()),
      r = n.length;
    if (0 === r) return;
    let i = (0, a.T)((0, u.f)(e)),
      o = n.indexOf(i);
    return n[-1 === o ? (1 === t ? 0 : r - 1) : o + t];
  }
  function d(e, t) {
    if (!e) return null;
    let n = (0, s.T)((0, u.f)(e).body, c()),
      r = n.length;
    if (0 === r) return null;
    let i = n.indexOf(e);
    return -1 === i ? null : n[(i + t + r) % r];
  }
  e.s(
    [
      "r",
      0,
      function (e) {
        (0, s.T)(e, c()).forEach((e) => {
          ((e.dataset.tabindex = e.getAttribute("tabindex") || ""),
            e.setAttribute("tabindex", "-1"));
        });
      },
      "d",
      0,
      function (e) {
        e.querySelectorAll("[data-tabindex]").forEach((e) => {
          let t = e.dataset.tabindex;
          (delete e.dataset.tabindex,
            t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex"));
        });
      },
      "O",
      0,
      function (e) {
        return f((0, u.f)(e).body, 1) || e;
      },
      "B",
      0,
      function (e) {
        return f((0, u.f)(e).body, -1) || e;
      },
      "W",
      0,
      function (e) {
        return d(e, 1);
      },
      "E",
      0,
      function (e) {
        return d(e, -1);
      },
      "C",
      0,
      c,
      "A",
      0,
      function (e, t) {
        let n = t || e.currentTarget,
          r = e.relatedTarget;
        return !r || !(0, a.I)(n, r);
      },
    ],
    50408,
  );
};
