// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(634103);
  let n = "pump_persisted_ui",
    r = new Set(),
    i = !1,
    o = (e) => {
      if ("u" < typeof document) return;
      let t = `${e}=`;
      for (let e of document.cookie.split("; "))
        if (e.startsWith(t)) return e.slice(t.length);
    },
    s = () => {
      if ("u" < typeof document || o(n)) return;
      let e =
        "u" > typeof location && "https:" === location.protocol
          ? "; Secure"
          : "";
      document.cookie = `${n}=1; Path=/; Max-Age=31536000; SameSite=Lax${e}`;
    },
    l = (e) => {
      try {
        let t = JSON.parse(e);
        if (null === t || "object" != typeof t || !("state" in t)) return null;
        return { state: t.state };
      } catch {
        return null;
      }
    };
  e.s([
    "I",
    0,
    ({ defaultPersisted: e, normalize: n = (e) => e }) => {
      let r = JSON.stringify(n(e)),
        i = (e) => {
          try {
            return JSON.stringify(n(e)) === r;
          } catch {
            return !1;
          }
        },
        o = {
          getItem: (e) => {
            let t = localStorage.getItem(e);
            if (null !== t) {
              let e = l(t);
              e && !i(e.state) && s();
            }
            return t;
          },
          removeItem: (e) => localStorage.removeItem(e),
          setItem: (e, t) => {
            localStorage.setItem(e, t);
            let n = l(t);
            (n && i(n.state)) || s();
          },
        };
      return (0, t.j)(() => o);
    },
    "l",
    0,
    () => {
      let e;
      return !!((e = o(n)) && e.length > 0);
    },
    "m",
    0,
    (e) => (r.add(e), i && e.persist.rehydrate(), e),
    "q",
    0,
    () => {
      for (let e of ((i = !0), r)) e.persist.rehydrate();
    },
  ]);
};
