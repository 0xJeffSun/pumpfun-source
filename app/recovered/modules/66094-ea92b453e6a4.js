// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667);
  let i = {
      targetBytes: 307200,
      jpegLadder: [
        { maxEdgePx: 1024, quality: 0.8 },
        { maxEdgePx: 1024, quality: 0.6 },
        { maxEdgePx: 768, quality: 0.6 },
        { maxEdgePx: 512, quality: 0.5 },
      ],
      pngLadder: [
        { maxEdgePx: 1024, quality: 1 },
        { maxEdgePx: 768, quality: 1 },
        { maxEdgePx: 512, quality: 1 },
      ],
    },
    a = new Set(["image/gif", "image/svg+xml"]),
    r = (e, t, i) => {
      if (t + i.length > e.length) return !1;
      for (let a = 0; a < i.length; a += 1)
        if (e[t + a] !== i.charCodeAt(a)) return !1;
      return !0;
    },
    n = (e, t) => {
      for (let i = 0; i + t.length <= e.length; i += 1)
        if (r(e, i, t)) return !0;
      return !1;
    },
    l = async (e) => {
      let t = new Uint8Array(await e.slice(0, 65536).arrayBuffer());
      return r(t, 0, "RIFF") && r(t, 8, "WEBP")
        ? n(t, "ANIM") || n(t, "ANMF")
        : !!(137 === t[0] && r(t, 1, "PNG")) && n(t, "acTL");
    },
    s = (e, t = i) =>
      e
        ? { mimeType: "image/png", extension: "png", ladder: t.pngLadder }
        : { mimeType: "image/jpeg", extension: "jpg", ladder: t.jpegLadder },
    o = (e, t) => {
      let i = Math.max(e.width, e.height);
      if (i <= t) return { width: e.width, height: e.height };
      let a = t / i;
      return {
        width: Math.max(1, Math.round(e.width * a)),
        height: Math.max(1, Math.round(e.height * a)),
      };
    },
    d = (e, t) => {
      let i = e.replace(/\.[^./\\]+$/, "");
      return `${i || "image"}.${t}`;
    },
    c = async (e) => {
      if ("function" == typeof createImageBitmap) return createImageBitmap(e);
      let t = URL.createObjectURL(e);
      try {
        let e = new Image();
        return ((e.decoding = "async"), (e.src = t), await e.decode(), e);
      } finally {
        URL.revokeObjectURL(t);
      }
    },
    u = (e, t) => {
      let i = document.createElement("canvas");
      ((i.width = t.width), (i.height = t.height));
      let a = i.getContext("2d");
      if (!a) throw Error("Could not get a 2D canvas context");
      return (
        (a.imageSmoothingEnabled = !0),
        (a.imageSmoothingQuality = "high"),
        a.drawImage(e, 0, 0, t.width, t.height),
        { canvas: i, ctx: a }
      );
    },
    m = (e, t, i, a) => {
      let { canvas: r } = u(e, t);
      return new Promise((e, t) => {
        r.toBlob((i) => (i ? e(i) : t(Error("Canvas export failed"))), i, a);
      });
    },
    p = (e) => ({ width: e.width, height: e.height }),
    h = (e, t) =>
      "image/png" === e.type ||
      ("image/jpeg" !== e.type &&
        ((e, t) => {
          let i = o(t, 256),
            { ctx: a } = u(e, i),
            { data: r } = a.getImageData(0, 0, i.width, i.height);
          for (let e = 3; e < r.length; e += 4) if (r[e] < 255) return !0;
          return !1;
        })(t, p(t))),
    f = async ({ file: e, source: t, profile: i }) => {
      let a,
        r,
        n = p(t),
        { mimeType: l, extension: c, ladder: u } = s(h(e, t), i);
      for (let e of u) {
        let s = o(n, e.maxEdgePx),
          d = `${s.width}x${s.height}@${e.quality}`;
        if (d === r) continue;
        r = d;
        let c = await m(t, s, l, e.quality);
        if (((!a || c.size < a.size) && (a = c), c.size <= i.targetBytes))
          break;
      }
      if (a && !(a.size >= e.size))
        return new File([a], d(e.name, c), { type: l });
    },
    g = async (e) => {
      if (
        !(e.size > 307200 && e.type.startsWith("image/") && !a.has(e.type)) ||
        "u" < typeof document
      )
        return e;
      try {
        if (await l(e)) return e;
        let t = await c(e),
          a = await f({ file: e, source: t, profile: i });
        return ("close" in t && t.close(), a ?? e);
      } catch (i) {
        return (
          t.y.warn("Coin image compression failed, uploading original", {
            error: i instanceof Error ? i.message : String(i),
          }),
          e
        );
      }
    };
  e.s([
    "R",
    0,
    a,
    "v",
    0,
    g,
    "$",
    0,
    c,
    "I",
    0,
    f,
    "d",
    0,
    m,
    "J",
    0,
    (e, t) => {
      if (e.width <= t) return { width: e.width, height: e.height };
      let i = t / e.width;
      return { width: t, height: Math.max(1, Math.round(e.height * i)) };
    },
    "A",
    0,
    s,
    "q",
    0,
    l,
    "e",
    0,
    d,
    "G",
    0,
    h,
    "H",
    0,
    p,
  ]);
};
