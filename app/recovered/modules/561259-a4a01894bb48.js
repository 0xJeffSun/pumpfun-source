// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    r = ["video/mp4", "video/quicktime"],
    l = t.join(","),
    a = [...t, ...r].join(","),
    n = new Set(t),
    i = new Set(r),
    s = (e, t) => e.startsWith("image/") || (t && i.has(e));
  e.s([
    "w",
    0,
    l,
    "q",
    0,
    15,
    "v",
    0,
    a,
    "Z",
    0,
    50,
    "T",
    0,
    60,
    "C",
    0,
    (e, { allowVideo: t = !1 } = {}) => {
      if (!e) return null;
      for (let r of Array.from(e.items ?? [])) {
        if ("file" !== r.kind || !s(r.type, t)) continue;
        let e = r.getAsFile();
        if (e) return e;
      }
      for (let r of Array.from(e.files ?? [])) if (s(r.type, t)) return r;
      return null;
    },
    "e",
    0,
    (e) => i.has(e.type),
    "y",
    0,
    (e) => {
      let t = e.split(/[?#]/, 1)[0] ?? e;
      return /\.(mp4|mov)$/i.test(t);
    },
    "n",
    0,
    (e) =>
      new Promise((t, r) => {
        if ("u" < typeof document) return void t(null);
        let l = document.createElement("video");
        ((l.preload = "metadata"),
          (l.onloadedmetadata = () => {
            let { duration: e } = l;
            (l.removeAttribute("src"), t(Number.isFinite(e) ? e : null));
          }),
          (l.onerror = () => {
            (l.removeAttribute("src"), r(Error("video metadata unreadable")));
          }),
          (l.src = e));
      }),
    "X",
    0,
    (e) =>
      n.has(e.type)
        ? e.size > 0xf00000
          ? { ok: !1, reason: "too_large" }
          : { ok: !0 }
        : { ok: !1, reason: "unsupported_type" },
    "B",
    0,
    (e) =>
      i.has(e.type)
        ? e.size > 0x3200000
          ? { ok: !1, reason: "too_large" }
          : { ok: !0 }
        : { ok: !1, reason: "unsupported_type" },
  ]);
};
