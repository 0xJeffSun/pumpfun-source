// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    SERVER_REFERENCE_ID_LENGTH: function () {
      return l;
    },
    extractInfoFromServerReferenceId: function () {
      return o;
    },
    mightBeServerReferenceId: function () {
      return u;
    },
    omitUnusedArgs: function () {
      return i;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = 42;
  function u(e) {
    return e.length === l;
  }
  function o(e) {
    let t = parseInt(e.slice(0, 2), 16),
      n = (t >> 1) & 63,
      r = Array(6);
    for (let e = 0; e < 6; e++) {
      let t = (n >> (5 - e)) & 1;
      r[e] = 1 === t;
    }
    return {
      type: 1 == ((t >> 7) & 1) ? "use-cache" : "server-action",
      usedArgs: r,
      hasRestArgs: 1 == (1 & t),
    };
  }
  function i(e, t) {
    let n = Array(e.length),
      r = 0;
    for (let a = 0; a < e.length; a++)
      ((a < 6 && t.usedArgs[a]) || (a >= 6 && t.hasRestArgs)) &&
        ((n[a] = e[a]), (r = a + 1));
    return ((n.length = r), n);
  }
};
