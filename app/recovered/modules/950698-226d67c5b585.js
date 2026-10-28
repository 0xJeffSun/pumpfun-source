// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526658);
  let n = { GRANTED: "granted", NOT_GRANTED: "not-granted" };
  e.s([
    "e",
    0,
    n,
    "X",
    0,
    function (e) {
      let r = new t.S();
      return {
        tryToInit(t) {
          e || (e = t);
        },
        update(t) {
          ((e = t), r.notify());
        },
        isGranted: () => e === n.GRANTED,
        observable: r,
      };
    },
  ]);
};
