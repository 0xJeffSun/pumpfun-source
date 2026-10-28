// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "local-storage",
    r = new Map(),
    i = new Map(),
    s = new Map(),
    n = !1,
    o = () => {
      if (n) return;
      n = !0;
      let e = (e) => {
        var t;
        null === (t = e.key ?? null)
          ? r.forEach((e) => {
              e.forEach((e) => e());
            })
          : r.get(t)?.forEach((e) => e());
      };
      (window.addEventListener("storage", e), window.addEventListener(t, e));
    };
  (e.s(
    [
      "f",
      0,
      ({ key: e, codec: n }) => ({
        kind: "localKey",
        read: () => {
          let t = s.get(e);
          if (t) return t.value;
          let r = ((e) => {
            try {
              return window.localStorage.getItem(e);
            } catch {
              return null;
            }
          })(e);
          if (null === r) return;
          let o = i.get(e);
          if (o && o.raw === r) return o.value;
          let a = ((e, t) => {
            if ("raw" === t) return e;
            try {
              return JSON.parse(e);
            } catch {
              return;
            }
          })(r, n);
          return (i.set(e, { raw: r, value: a }), a);
        },
        write: (r) => {
          o();
          let i = "raw" === n ? String(r) : JSON.stringify(r);
          try {
            (window.localStorage.setItem(e, i), s.delete(e));
          } catch {
            s.set(e, { raw: i, value: r });
          }
          window.dispatchEvent(new StorageEvent(t, { key: e }));
        },
        remove: () => {
          o();
          try {
            window.localStorage.removeItem(e);
          } catch {}
          (s.delete(e),
            i.delete(e),
            window.dispatchEvent(new StorageEvent(t, { key: e })));
        },
        subscribe: (t) => {
          o();
          let i = r.get(e);
          return (
            i || ((i = new Set()), r.set(e, i)),
            i.add(t),
            () => {
              i?.delete(t);
            }
          );
        },
      }),
    ],
    654506,
  ),
    e.s(["f", 0, (e) => e], 529281));
};
