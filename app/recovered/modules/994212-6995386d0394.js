// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t =
      /(?:https:\/\/)?(?:player\.)?vimeo(?:\.com)?\/(?:video\/)?(\d+)(?:(?:\?hash=|\?h=|\/)(.*))?/,
    o = new Map(),
    i = new Map();
  async function n(e, t, n) {
    if (o.has(e)) return o.get(e);
    if (i.has(e)) return i.get(e);
    let c = `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${e}`;
    n && (c = c.concat(`?h=${n}`));
    let s = window
      .fetch(c, { mode: "cors", signal: t.signal })
      .then((e) => e.json())
      .then((t) => {
        let i = t?.thumbnail_url?.match(/vimeocdn.com\/video\/(.*)?_/)?.[1],
          n = i ? `https://i.vimeocdn.com/video/${i}_1920x1080.webp` : "",
          c = {
            title: t?.title ?? "",
            duration: t?.duration ?? 0,
            poster: n,
            pro: "basic" !== t.account_type,
          };
        return (o.set(e, c), c);
      })
      .finally(() => i.delete(e));
    return (i.set(e, s), s);
  }
  e.s([
    "getVimeoVideoInfo",
    0,
    n,
    "resolveVimeoVideoId",
    0,
    function (e) {
      let o = e.match(t);
      return { videoId: o?.[1], hash: o?.[2] };
    },
  ]);
};
