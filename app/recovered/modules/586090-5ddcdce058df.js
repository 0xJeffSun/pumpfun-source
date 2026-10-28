// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  let t = {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    i = { ...t, "video/*": [".mp4", ".webm"] };
  e.s([
    "v",
    0,
    i,
    "z",
    0,
    "https://media.pump.fun/",
    "G",
    0,
    t,
    "O",
    0,
    { IMAGE: 45e5, VIDEO: 1e7, BANNER: 45e5 },
    "f",
    0,
    { NAME_MAX_LENGTH: 32, TICKER_MAX_LENGTH: 10, DESCRIPTION_MAX_LENGTH: 2e3 },
  ]);
};
