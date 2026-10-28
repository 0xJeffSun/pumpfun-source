// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t =
      /(?:https:\/\/)?(?:player\.)?vimeo(?:\.com)?\/(?:video\/)?(\d+)(?:(?:\?hash=|\?h=|\/)(.*))?/,
    i = new Map(),
    s = new Map();
  async function r(e, t, r) {
    if (i.has(e)) return i.get(e);
    if (s.has(e)) return s.get(e);
    let a = `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${e}`;
    r && (a = a.concat(`?h=${r}`));
    let o = window
      .fetch(a, { mode: "cors", signal: t.signal })
      .then((e) => e.json())
      .then((t) => {
        let s = t?.thumbnail_url?.match(/vimeocdn.com\/video\/(.*)?_/)?.[1],
          r = s ? `https://i.vimeocdn.com/video/${s}_1920x1080.webp` : "",
          a = {
            title: t?.title ?? "",
            duration: t?.duration ?? 0,
            poster: r,
            pro: "basic" !== t.account_type,
          };
        return (i.set(e, a), a);
      })
      .finally(() => s.delete(e));
    return (s.set(e, o), o);
  }
  e.s([
    "getVimeoVideoInfo",
    0,
    r,
    "resolveVimeoVideoId",
    0,
    function (e) {
      let i = e.match(t);
      return { videoId: i?.[1], hash: i?.[2] };
    },
  ]);
};
