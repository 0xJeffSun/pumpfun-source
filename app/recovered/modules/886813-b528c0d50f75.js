// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t, e, r, o) {
    try {
      ("local" === t ? localStorage : sessionStorage).setItem(e, r);
    } catch (t) {
      console.warn(o, t);
    }
  }
  function r(t) {
    if ("function" == typeof crypto.randomUUID)
      return `${t}-${crypto.randomUUID()}`;
    let e = crypto.getRandomValues(new Uint8Array(16)),
      r = "";
    for (let t of e) r += t.toString(16).padStart(2, "0");
    return `${t}-${Date.now()}-${r}`;
  }
  let o = "pump-device-id",
    n = "pump_device_id";
  function i() {
    if ("u" > typeof document) {
      var t = document.cookie;
      if (t)
        for (let e of t.split(";")) {
          let [t, ...r] = e.trim().split("=");
          if (t === n && r.length > 0)
            return decodeURIComponent(r.join("=")) || void 0;
        }
      return;
    }
  }
  function s(t) {
    if ("u" < typeof document) return;
    let e = "https:" === location.protocol ? "; secure" : "";
    document.cookie = `${n}=${encodeURIComponent(t)}; path=/; max-age=63072000; samesite=lax${e}`;
  }
  t.s([
    "C",
    0,
    r,
    "$",
    0,
    function () {
      let t = i(),
        n = (function (t, e, r) {
          try {
            return ("local" === t ? localStorage : sessionStorage).getItem(e);
          } catch (t) {
            return (console.warn(r, t), null);
          }
        })(
          "local",
          o,
          "localStorage access failed for device ID, generating new ID",
        );
      if (n) return (n !== t && s(n), n);
      if (t)
        return (
          e("local", o, t, "Failed to persist device ID to localStorage"),
          t
        );
      let a = r("device");
      return (
        s(a),
        e("local", o, a, "Failed to persist device ID to localStorage"),
        a
      );
    },
    "p",
    0,
    i,
  ]);
};
