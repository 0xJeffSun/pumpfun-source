// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "useMergedRef", {
      enumerable: !0,
      get: function () {
        return o;
      },
    }));
  let n = e.r(352386);
  function o(e, t) {
    let r = (0, n.useRef)(null),
      o = (0, n.useRef)(null);
    return (0, n.useCallback)(
      (n) => {
        if (null === n) {
          let e = r.current;
          e && ((r.current = null), e());
          let t = o.current;
          t && ((o.current = null), t());
        } else (e && (r.current = i(e, n)), t && (o.current = i(t, n)));
      },
      [e, t],
    );
  }
  function i(e, t) {
    if ("function" != typeof e)
      return (
        (e.current = t),
        () => {
          e.current = null;
        }
      );
    {
      let r = e(t);
      return "function" == typeof r ? r : () => e(null);
    }
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
