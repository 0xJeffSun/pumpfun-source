// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e, t) => e?.find((e) => e.url === t)?.contentType,
    n = { "video/quicktime": "video/mp4" },
    r = new Set(["mov", "qt"]),
    s = new Set(["png", "jpg", "jpeg", "gif", "webp", "avif", "svg"]),
    i = new Set(["mp4", "webm", "ogv", "mov", "m4v"]);
  e.s([
    "Y",
    0,
    function (e, t) {
      return Math.max(0, e.length - t);
    },
    "h",
    0,
    function (e) {
      if (!e.length) return null;
      let t = e.filter((e) => "image" === e.kind).map((e) => e.url);
      if (t.length >= 2) return { type: "gallery", urls: t };
      if (1 === t.length) return { type: "image", url: t[0] };
      let n = e.find((e) => "video" === e.kind);
      if (n) {
        let e = (function (e) {
          if ("video" !== e.kind) return [];
          let t = [],
            n = new Set(),
            r = (e, r) => {
              !e || n.has(e) || (n.add(e), t.push({ src: e, mimeType: r }));
            };
          return (
            "ready" === e.processingStatus &&
              (r(e.playback?.hlsUrl, "application/x-mpegURL"),
              r(e.playback?.mp4Url, "video/mp4")),
            r(e.url, e.contentType),
            t
          );
        })(n);
        return {
          type: "video",
          url: n.url,
          mimeType: n.contentType,
          sources: e,
          posterUrl: n.playback?.posterUrl,
          processingStatus: n.processingStatus,
        };
      }
      return null;
    },
    "U",
    0,
    function (e) {
      let t;
      try {
        t = new URL(e);
      } catch {
        return null;
      }
      if ("https:" !== t.protocol && "http:" !== t.protocol) return null;
      let n = t.pathname.split("/").filter(Boolean).at(-1);
      if (!n) return null;
      let r = n.lastIndexOf(".");
      if (r <= 0 || r === n.length - 1) return null;
      let a = n.slice(r + 1).toLowerCase();
      return s.has(a)
        ? { type: "image", url: t.href }
        : i.has(a)
          ? { type: "video", url: t.href, sources: [{ src: t.href }] }
          : null;
    },
    "X",
    0,
    function (e) {
      if (e) {
        if ("image" === e.type) return e.url;
        if ("gallery" === e.type) return e.urls[0];
      }
    },
    "D",
    0,
    function (e, n) {
      if (!e) return null;
      if ("image" === e.type)
        return { url: e.url, kind: "image", contentType: t(n, e.url) };
      if ("video" === e.type)
        return { url: e.url, kind: "video", contentType: e.mimeType };
      let r = e.urls[0];
      return { url: r, kind: "image", contentType: t(n, r) };
    },
    "g",
    0,
    function ({ src: e, mimeType: t }) {
      if (t) return n[t.toLowerCase()] ?? t;
      let s = (function (e) {
        let t = e.split(/[?#]/, 1)[0].split("/").filter(Boolean).at(-1);
        if (!t) return;
        let n = t.lastIndexOf(".");
        if (!(n <= 0) && n !== t.length - 1)
          return t.slice(n + 1).toLowerCase();
      })(e);
      if (s && r.has(s)) return "video/mp4";
    },
  ]);
};
