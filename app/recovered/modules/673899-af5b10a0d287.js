// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    computeCacheBustingSearchParam: function () {
      return s;
    },
    computeLegacyCacheBustingSearchParam: function () {
      return f;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(38111),
    u = new TextEncoder();
  function o(e) {
    return void 0 === e ? "0" : Array.isArray(e) ? e.join(",") : e;
  }
  function i(e, t, n, r) {
    return (void 0 === e || "0" === e) &&
      void 0 === t &&
      void 0 === n &&
      void 0 === r
      ? null
      : [e ?? "0", o(t), o(n), o(r)].join(",");
  }
  async function c(e) {
    var t = new Uint8Array(
      await globalThis.crypto.subtle.digest("SHA-256", u.encode(e)),
    ).subarray(0, 12);
    let n = "";
    for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
    return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  async function s(e, t, n, r) {
    let a = i(e, t, n, r);
    return null === a ? "" : c(a);
  }
  function f(e, t, n, r) {
    let a = i(e, t, n, r);
    return null === a ? "" : (0, l.hexHash)(a);
  }
};
