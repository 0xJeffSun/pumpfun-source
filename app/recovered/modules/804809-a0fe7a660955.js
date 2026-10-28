// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = {
    callServer: function () {
      return s.callServer;
    },
    createServerReference: function () {
      return o.createServerReference;
    },
    findSourceMapURL: function () {
      return a.findSourceMapURL;
    },
  };
  for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
  let s = e.r(225599),
    a = e.r(730137),
    o = e.r(925142);
};
