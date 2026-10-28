// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "Image", {
      enumerable: !0,
      get: function () {
        return p;
      },
    }));
  let r = e.r(836437),
    i = e.r(56421),
    o = e.r(732486),
    s = i._(e.r(352386)),
    l = r._(e.r(231332)),
    a = r._(e.r(720398)),
    u = e.r(907057),
    d = e.r(416483),
    c = e.r(16244),
    f = r._(e.r(27080)),
    m = e.r(610961);
  function E(e, t, n, r, i, o, s) {
    let l = e?.src;
    e &&
      e["data-loaded-src"] !== l &&
      ((e["data-loaded-src"] = l),
      ("decode" in e ? e.decode() : Promise.resolve())
        .catch(() => {})
        .then(() => {
          if (e.parentElement && e.isConnected) {
            if (("empty" !== t && i(!0), n?.current)) {
              let t = new Event("load");
              Object.defineProperty(t, "target", { writable: !1, value: e });
              let r = !1,
                i = !1;
              n.current({
                ...t,
                nativeEvent: t,
                currentTarget: e,
                target: e,
                isDefaultPrevented: () => r,
                isPropagationStopped: () => i,
                persist: () => {},
                preventDefault: () => {
                  ((r = !0), t.preventDefault());
                },
                stopPropagation: () => {
                  ((i = !0), t.stopPropagation());
                },
              });
            }
            r?.current && r.current(e);
          }
        }));
  }
  function _(e) {
    return s.use ? { fetchPriority: e } : { fetchpriority: e };
  }
  "u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
  let S = "u" < typeof window ? s.useEffect : s.useLayoutEffect,
    T = (0, s.forwardRef)(
      (
        {
          src: e,
          srcSet: t,
          sizes: n,
          height: r,
          width: i,
          decoding: l,
          className: a,
          style: u,
          fetchPriority: d,
          placeholder: c,
          loading: f,
          unoptimized: T,
          fill: I,
          onLoadRef: p,
          onLoadingCompleteRef: N,
          setBlurComplete: R,
          setShowAltText: O,
          sizesInput: A,
          onLoad: g,
          onError: h,
          ...b
        },
        C,
      ) => {
        let U = (0, s.useRef)(!1),
          M = (0, s.useRef)(null);
        S(() => {
          let { current: e } = U,
            { current: t } = M;
          e ||
            null === t ||
            (h && (t.src = t.src),
            t.complete && E(t, c, p, N, R, T, A),
            (U.current = !0));
        }, [e, c, p, N, h, T, A]);
        let P = (0, m.useMergedRef)(C, M);
        return (0, o.jsx)("img", {
          ...b,
          ..._(d),
          loading: f,
          width: i,
          height: r,
          decoding: l,
          "data-nimg": I ? "fill" : "1",
          className: a,
          style: u,
          sizes: n,
          srcSet: t,
          src: e,
          ref: P,
          onLoad: (e) => {
            E(e.currentTarget, c, p, N, R, T, A);
          },
          onError: (e) => {
            (O(!0), "empty" !== c && R(!0), h && h(e));
          },
        });
      },
    );
  function I({ isAppRouter: e, imgAttributes: t }) {
    let n = {
      as: "image",
      imageSrcSet: t.srcSet,
      imageSizes: t.sizes,
      crossOrigin: t.crossOrigin,
      referrerPolicy: t.referrerPolicy,
      ..._(t.fetchPriority),
    };
    return e && l.default.preload
      ? (l.default.preload(t.src, n), null)
      : (0, o.jsx)(a.default, {
          children: (0, o.jsx)(
            "link",
            { rel: "preload", href: t.srcSet ? void 0 : t.src, ...n },
            "__nimg-" + t.src + t.srcSet + t.sizes,
          ),
        });
  }
  let p = (0, s.forwardRef)((e, t) => {
    let n = (0, s.useContext)(d.RouterContext),
      r = (0, c.useImageConfig)(),
      { onLoad: i, onLoadingComplete: l } = e,
      a = (0, s.useRef)(i);
    (0, s.useEffect)(() => {
      a.current = i;
    }, [i]);
    let m = (0, s.useRef)(l);
    (0, s.useEffect)(() => {
      m.current = l;
    }, [l]);
    let [E, _] = (0, s.useState)(!1),
      [S, p] = (0, s.useState)(!1),
      { props: N, meta: R } = (0, u.getImgProps)(e, {
        defaultLoader: f.default,
        imgConf: r,
        blurComplete: E,
        showAltText: S,
      });
    return (0, o.jsxs)(o.Fragment, {
      children: [
        (0, o.jsx)(T, {
          ...N,
          unoptimized: R.unoptimized,
          placeholder: R.placeholder,
          fill: R.fill,
          onLoadRef: a,
          onLoadingCompleteRef: m,
          setBlurComplete: _,
          setShowAltText: p,
          sizesInput: e.sizes,
          ref: t,
        }),
        R.preload ? (0, o.jsx)(I, { isAppRouter: !n, imgAttributes: N }) : null,
      ],
    });
  });
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
