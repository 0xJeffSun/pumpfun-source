// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "https://customer-6l8lsi10ia0kjxi9.cloudflarestream.com";
  e.s([
    "z",
    0,
    (e, r) => `${t}/${e}/thumbnails/thumbnail.jpg?width=${r}`,
    "G",
    0,
    (e, r) => `${t}/${e}/thumbnails/thumbnail.jpg?time=0s&height=${r}`,
    "m",
    0,
    ({ videoId: e, width: r, height: l }) =>
      `${t}/${e}/thumbnails/thumbnail.jpg?time=0s&width=${r}&height=${l}&fit=crop`,
    "n",
    0,
    (e) => `${t}/${e}/manifest/video.m3u8`,
    "o",
    0,
    (e) => `${t}/${e}/downloads/default.mp4`,
  ]);
};
