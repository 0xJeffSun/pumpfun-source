// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "pump_session_id";
  function r(e) {
    let t = e.split("_");
    if (4 !== t.length || "pump" !== t[0] || "session" !== t[1]) return null;
    let r = Number.parseInt(t[2], 36);
    return Number.isFinite(r) ? r : null;
  }
  function n(e, t = Date.now()) {
    let o = r(e);
    return null === o || o > t + 6e4 || t - o > 864e5;
  }
  function o() {
    if ("u" > typeof document) {
      var e = document.cookie;
      if (e)
        for (let r of e.split(";")) {
          let [e, ...n] = r.trim().split("=");
          if (e === t && n.length > 0)
            return decodeURIComponent(n.join("=")) || void 0;
        }
      return;
    }
  }
  e.s([
    "r",
    0,
    function () {
      let e = o();
      if (e && !n(e)) return e;
      let r = (function (e = Date.now()) {
        let t = e.toString(36),
          r = new Uint8Array(12);
        crypto.getRandomValues(r);
        let n = "";
        for (let e of r) n += e.toString(36).padStart(2, "0");
        return `pump_session_${t}_${n}`;
      })();
      return (
        (function (e) {
          if ("u" < typeof document) return;
          let r = "https:" === location.protocol ? "; secure" : "";
          document.cookie = `${t}=${encodeURIComponent(e)}; path=/; max-age=86400; samesite=lax${r}`;
        })(r),
        r
      );
    },
    "d",
    0,
    o,
    "l",
    0,
    r,
    "A",
    0,
    n,
  ]);
};
