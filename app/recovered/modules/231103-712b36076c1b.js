// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(895453),
    n = e.i(974155);
  let r = ["chrome-extension://", "moz-extension://"];
  function i(e) {
    return r.some((t) => e.includes(t));
  }
  e.s(
    [
      "f",
      0,
      function (e, r, o = "u" > typeof location ? location.origin : "") {
        let s = e.allowedTrackingOrigins;
        if (!s)
          return (
            !(function (e, t = "") {
              return (
                !i(e) &&
                i(
                  t.split("\n").filter((e) => {
                    let t = e.trim();
                    return t.length && /^at\s+|@/.test(t);
                  })[1] || "",
                )
              );
            })(o, r) ||
            (t.s.error(
              "Running the Browser SDK in a Web extension content script is forbidden unless the `allowedTrackingOrigins` option is provided.",
            ),
            !1)
          );
        let u = (0, n.c)(s, o);
        return (u || t.s.error("SDK initialized on a non-allowed domain."), u);
      },
    ],
    231103,
  );
};
