// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  class n extends Error {
    constructor() {
      (super("Invalid playlist url"), (this.name = "InvalidPlaylistUrlError"));
    }
  }
  e.s([
    "f",
    0,
    (e) => {
      let t = new URL(e),
        [a, r, i, o] = t.pathname.split("/");
      if (!r || !i || !o) throw new n();
      let [s, l, c] = i.split("_");
      if (!s || !l || !c) throw new n();
      return {
        roomId: r,
        livestreamId: s,
        date: l,
        time: c,
        directory: i,
        fileName: o,
        url: t,
      };
    },
  ]);
};
