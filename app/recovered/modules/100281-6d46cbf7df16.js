// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var a,
    o = e.i(149502);
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.isVersionedTransaction = n.isBrowser = void 0),
    (n.chunks = function (e, t) {
      return Array.apply(0, Array(Math.ceil(e.length / t))).map((n, a) =>
        e.slice(a * t, (a + 1) * t),
      );
    }),
    (n.isBrowser =
      o.default.env.ANCHOR_BROWSER ||
      ("u" > typeof window &&
        !(null == (a = window.process) ? void 0 : a.hasOwnProperty("type")))),
    (n.isVersionedTransaction = (e) => "version" in e));
};
