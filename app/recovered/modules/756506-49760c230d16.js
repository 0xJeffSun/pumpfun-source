// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(292686),
    t = e.i(484169),
    a = e.i(851746);
  e.s([
    "C",
    0,
    (e, t) =>
      t || null == e
        ? n.KL.AUTO
        : e >= 1080
          ? n.KL.HIGH
          : e >= 720
            ? n.KL.MEDIUM
            : n.KL.LOW,
    "L",
    0,
    (e) => {
      switch (e) {
        case a.f.AUTO:
          return n.KL.AUTO;
        case a.f.HIGH:
          return n.KL.HIGH;
        case a.f.MEDIUM:
          return n.KL.MEDIUM;
        case a.f.LOW:
          return n.KL.LOW;
      }
    },
    "X",
    0,
    (e) => {
      switch (e) {
        case a.f.HIGH:
          return t.VideoQuality.HIGH;
        case a.f.MEDIUM:
          return t.VideoQuality.MEDIUM;
        case a.f.LOW:
          return t.VideoQuality.LOW;
      }
    },
  ]);
};
