// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    HEAD_REQUEST_KEY: function () {
      return u;
    },
    ROOT_SEGMENT_REQUEST_KEY: function () {
      return l;
    },
    appendSegmentRequestKeyPart: function () {
      return i;
    },
    convertSegmentPathToStaticExportFilename: function () {
      return f;
    },
    createSegmentRequestKeyPart: function () {
      return o;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = "",
    u = "/_head";
  function o(e) {
    if ("string" == typeof e) return "/_not-found" === e ? "_not-found" : s(e);
    let t = e[0];
    return "$" + e[2] + "$" + s(t);
  }
  function i(e, t, n) {
    return e + "/" + ("children" === t ? n : `@${s(t)}/${n}`);
  }
  let c = /^[a-zA-Z0-9\-_@]+$/;
  function s(e) {
    return c.test(e)
      ? e
      : "!" +
          btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function f(e) {
    return `__next${e.replace(/\//g, ".")}.txt`;
  }
};
