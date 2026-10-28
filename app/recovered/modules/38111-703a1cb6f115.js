// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    djb2Hash: function () {
      return l;
    },
    hexHash: function () {
      return u;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  function l(e) {
    let t = 5381;
    for (let n = 0; n < e.length; n++) t = ((t << 5) + t + e.charCodeAt(n)) | 0;
    return t >>> 0;
  }
  function u(e) {
    return l(e).toString(36).slice(0, 5);
  }
};
