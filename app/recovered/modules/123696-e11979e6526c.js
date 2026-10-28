// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t =
      /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)(?:\/shorts)?\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/,
    i = new Map(),
    s = new Map();
  async function r(e, t) {
    if (i.has(e)) return i.get(e);
    if (s.has(e)) return s.get(e);
    let r = new Promise(async (s) => {
      for (let n of ["maxresdefault", "sddefault", "hqdefault"])
        for (let h of [!0, !1]) {
          var r, o, a;
          let c =
            ((r = e),
            (o = n),
            (a = h),
            `https://i.ytimg.com/${a ? "vi_webp" : "vi"}/${r}/${o}.${a ? "webp" : "jpg"}`);
          if (
            (await fetch(c, { mode: "no-cors", signal: t.signal })).status < 400
          ) {
            (i.set(e, c), s(c));
            return;
          }
        }
    })
      .catch(() => "")
      .finally(() => s.delete(e));
    return (s.set(e, r), r);
  }
  e.s([
    "findYouTubePoster",
    0,
    r,
    "resolveYouTubeVideoId",
    0,
    function (e) {
      return e.match(t)?.[1];
    },
  ]);
};
