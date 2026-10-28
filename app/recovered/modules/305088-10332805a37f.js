// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(430257),
    n = e.i(517770),
    o = e.i(789022),
    l = e.i(264458),
    a = e.i(352386),
    s = e.i(480085),
    c = e.i(884614),
    u = e.i(77962),
    d = e.i(374930),
    f = e.i(861701),
    m = e.i(3734),
    p = e.i(29797);
  let v = (e) => (
    (({ containerRef: e, threshold: t = 0, persistentPlayerData: r }) => {
      let i = (0, d.f)(e, { threshold: t }),
        n = (0, c.f)(),
        o = (0, u.Z9)("pictureInPicture"),
        l = (0, u.Z9)("canPictureInPicture"),
        s = (0, u.Z9)("currentTime"),
        v = (0, a.useRef)(s);
      v.current = s;
      let h = (0, u.Z9)("muted"),
        g = (0, a.useRef)(!1),
        y = (0, a.useRef)(!1),
        b = (0, a.useRef)(!1),
        { hasGestureRef: x, resetGesture: j } = (0, f.f)(),
        { setAutoEngaged: w } = (0, m.f)(),
        { pipStream: S, setPipStream: P } = (0, p.f)();
      return (
        (0, a.useEffect)(
          () => () => {
            w(!1);
          },
          [w],
        ),
        (0, a.useEffect)(() => {
          let e = !!r,
            t = e && !S;
          if ((e && S && S.mintId !== r?.mintId) || (!l && !t)) return;
          let a = b.current;
          if (((b.current = o), !i && !o && x.current && !g.current)) {
            ((y.current = !0),
              (g.current = !0),
              w(!0),
              t
                ? P({ ...r, muted: h }, v.current)
                : l && n.enterPictureInPicture());
            return;
          }
          if (y.current && o) {
            y.current = !1;
            return;
          }
          if (i && o && g.current) {
            ((g.current = !1), w(!1), n.exitPictureInPicture(), j());
            return;
          }
          (a && !o && g.current && ((g.current = !1), w(!1)),
            y.current && !o && (y.current = !1));
        }, [i, o, l, h, n, x, j, w, r, S, P])
      );
    })(e),
    null
  );
  var h = e.i(157633);
  let g = (e) => {
    let i,
      n,
      o,
      l,
      a = (0, r.c)(6),
      { onClick: s } = e;
    return (
      a[0] !== s
        ? ((i = (e) => {
            (e.stopPropagation(), e.preventDefault(), s());
          }),
          (a[0] = s),
          (a[1] = i))
        : (i = a[1]),
      a[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(h.e, { size: 32, className: "text-white" })),
          (o = (0, t.jsx)("span", {
            className: "text-lg font-semibold text-white",
            children: "Click to unmute",
          })),
          (a[2] = n),
          (a[3] = o))
        : ((n = a[2]), (o = a[3])),
      a[4] !== i
        ? ((l = (0, t.jsxs)("div", {
            onClick: i,
            className:
              "pointer-events-auto absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/30 transition-opacity hover:bg-black/10",
            children: [n, o],
          })),
          (a[4] = i),
          (a[5] = l))
        : (l = a[5]),
      l
    );
  };
  var y = a;
  class b extends y.Component {
    state = { hasError: !1, canRetry: !1 };
    componentDidCatch() {
      (this.setState((e) => ({ ...e, hasError: !0 })),
        requestAnimationFrame(() => {
          this.setState((e) => ({ ...e, canRetry: !0 }));
        }));
    }
    render() {
      return this.state.hasError && !this.state.canRetry
        ? null
        : this.props.children;
    }
  }
  let x = (e) => {
    Promise.resolve(e.play()).catch(() => {});
  };
  var j = e.i(997466),
    w = e.i(405048),
    S = e.i(534061);
  let P = (e) => {
      let c,
        d,
        f,
        m,
        p,
        h,
        y,
        b,
        P,
        T,
        I,
        C,
        E,
        k,
        R,
        N,
        L,
        _,
        A,
        M,
        V,
        O,
        D,
        z,
        F,
        K,
        $,
        U,
        H,
        Z,
        B,
        J,
        W,
        G,
        Q,
        q,
        X,
        Y,
        ee,
        et,
        er,
        ei,
        en,
        eo,
        el,
        ea = (0, r.c)(85);
      if (ea[0] !== e) {
        let {
          autoPlay: t,
          playsInline: r,
          aspectRatio: i,
          Top: n,
          Bottom: o,
          className: l,
          muted: a,
          src: s,
          onAutoPlayFail: u,
          isLoading: v,
          loaderType: g,
          videoType: x,
          videoId: j,
          roomId: w,
          videoTitle: S,
          onProviderSetup: F,
          onProviderChange: K,
          hasAutoPip: $,
          initialTime: U,
          persistentPlayerData: H,
          creatorId: Z,
          creatorCcUserId: B,
          page: J,
          participantRole: W,
          ...G
        } = e;
        ((_ = t),
          (A = r),
          (M = i),
          (d = n),
          (c = o),
          (f = l),
          (P = a),
          (L = s),
          (T = u),
          (y = v),
          (b = g),
          (z = x),
          (O = j),
          (N = w),
          (D = S),
          (C = F),
          (I = K),
          (V = $),
          (h = U),
          (p = Z),
          (m = B),
          (E = J),
          (k = W),
          (R = G),
          (ea[0] = e),
          (ea[1] = c),
          (ea[2] = d),
          (ea[3] = f),
          (ea[4] = m),
          (ea[5] = p),
          (ea[6] = h),
          (ea[7] = y),
          (ea[8] = b),
          (ea[9] = P),
          (ea[10] = T),
          (ea[11] = I),
          (ea[12] = C),
          (ea[13] = E),
          (ea[14] = k),
          (ea[15] = R),
          (ea[16] = N),
          (ea[17] = L),
          (ea[18] = _),
          (ea[19] = A),
          (ea[20] = M),
          (ea[21] = V),
          (ea[22] = O),
          (ea[23] = D),
          (ea[24] = z));
      } else
        ((c = ea[1]),
          (d = ea[2]),
          (f = ea[3]),
          (m = ea[4]),
          (p = ea[5]),
          (h = ea[6]),
          (y = ea[7]),
          (b = ea[8]),
          (P = ea[9]),
          (T = ea[10]),
          (I = ea[11]),
          (C = ea[12]),
          (E = ea[13]),
          (k = ea[14]),
          (R = ea[15]),
          (N = ea[16]),
          (L = ea[17]),
          (_ = ea[18]),
          (A = ea[19]),
          (M = ea[20]),
          (V = ea[21]),
          (O = ea[22]),
          (D = ea[23]),
          (z = ea[24]));
      let es = void 0 === _ || _,
        ec = void 0 === A || A,
        eu = void 0 === M ? "16/9" : M,
        ed = void 0 !== V && V,
        ef = (0, a.useRef)(null),
        em = (0, a.useRef)(null),
        ep = (0, a.useRef)(!1),
        { property: ev, playerName: eh } = (0, w.S)();
      ea[25] !== m ||
      ea[26] !== p ||
      ea[27] !== E ||
      ea[28] !== k ||
      ea[29] !== eh ||
      ea[30] !== ev ||
      ea[31] !== N ||
      ea[32] !== O ||
      ea[33] !== D ||
      ea[34] !== z
        ? ((F = {
            videoType: z,
            videoId: O,
            videoTitle: D,
            roomId: N,
            playerName: eh,
            creatorId: p,
            creatorCcUserId: m,
            page: E,
            participantRole: k,
            property: ev,
          }),
          (ea[25] = m),
          (ea[26] = p),
          (ea[27] = E),
          (ea[28] = k),
          (ea[29] = eh),
          (ea[30] = ev),
          (ea[31] = N),
          (ea[32] = O),
          (ea[33] = D),
          (ea[34] = z),
          (ea[35] = F))
        : (F = ea[35]);
      let eg = (0, j.f)(F),
        {
          showUnmuteOverlay: ey,
          autoPlayFailed: eb,
          unmute: ex,
        } = ((e, t) => {
          let [r, i] = (0, a.useState)(!1),
            n = (0, a.useRef)(!1),
            o = (0, a.useCallback)(() => {
              if (!n.current) {
                n.current = !0;
                try {
                  (t?.(),
                    e.current && ((e.current.muted = !0), x(e.current)),
                    i(!0));
                } finally {
                  n.current = !1;
                }
              }
            }, [e, t]),
            l = (0, a.useCallback)(() => {
              e.current && ((e.current.muted = !1), x(e.current), i(!1));
            }, [e]);
          return (0, a.useMemo)(
            () => ({ showUnmuteOverlay: r, autoPlayFailed: o, unmute: l }),
            [r, o, l],
          );
        })(ef, T),
        ej =
          ((ei = (0, u.Z9)("waiting", ef)),
          (en = (0, u.Z9)("canPlay", ef)),
          (eo = (0, u.Z9)("playing", ef)),
          (el = (0, u.Z9)("paused", ef)),
          ei || !en || (en && !eo && !el) || y),
        ew = (0, l.default)(["m-0 block aspect-video w-full p-0", f]);
      if (
        (ea[36] !== h
          ? ((K = () => {
              if (!ef.current || !h || h <= 0 || ep.current) return;
              let e = ef.current,
                t = () => {
                  !ep.current &&
                    h > 0 &&
                    ((e.currentTime = h), (ep.current = !0));
                };
              if (!e.state.canPlay)
                return (
                  e.addEventListener("can-play", t),
                  () => e.removeEventListener("can-play", t)
                );
              t();
            }),
            ($ = [h]),
            (ea[36] = h),
            (ea[37] = K),
            (ea[38] = $))
          : ((K = ea[37]), ($ = ea[38])),
        (0, a.useEffect)(K, $),
        !L)
      ) {
        let e, r;
        return (
          ea[39] !== eu
            ? ((e = { aspectRatio: eu }), (ea[39] = eu), (ea[40] = e))
            : (e = ea[40]),
          ea[41] !== ej || ea[42] !== b
            ? ((r = ej && (0, t.jsx)(s.f, { loaderType: b })),
              (ea[41] = ej),
              (ea[42] = b),
              (ea[43] = r))
            : (r = ea[43]),
          (0, t.jsx)("div", {
            ref: em,
            className: "relative isolate overflow-hidden rounded-md",
            children: (0, t.jsx)("div", {
              className: (0, l.default)(["relative", ew]),
              style: e,
              children: r,
            }),
          })
        );
      }
      return (
        ea[44] !== I
          ? ((U = (e, t) => {
              ((0, S.f)(e), I?.(e, t));
            }),
            (ea[44] = I),
            (ea[45] = U))
          : (U = ea[45]),
        ea[46] !== eg || ea[47] !== C
          ? ((H = (...e) => {
              (C?.(...e), eg(...e));
            }),
            (ea[46] = eg),
            (ea[47] = C),
            (ea[48] = H))
          : (H = ea[48]),
        ea[49] === Symbol.for("react.memo_cache_sentinel")
          ? ((Z = (0, t.jsx)(o.s, {})),
            (B = (0, t.jsx)(n.R, {
              event: "pointerup",
              action: "toggle:controls",
              className: "absolute inset-0 z-0 block h-full w-full md:hidden",
            })),
            (J = (0, t.jsx)(n.R, {
              event: "pointerup",
              action: "toggle:paused",
              className: "absolute inset-0 z-0 hidden h-full w-full md:block",
            })),
            (W = (0, t.jsx)(n.R, {
              event: "pointerup",
              action: "toggle:controls",
              className: "absolute inset-0 z-0 hidden h-full w-full md:block",
            })),
            (G = (0, t.jsx)(n.R, {
              event: "dblpointerup",
              action: "toggle:fullscreen",
              className: "absolute inset-0 z-0 hidden h-full w-full md:block",
            })),
            (ea[49] = Z),
            (ea[50] = B),
            (ea[51] = J),
            (ea[52] = W),
            (ea[53] = G))
          : ((Z = ea[49]),
            (B = ea[50]),
            (J = ea[51]),
            (W = ea[52]),
            (G = ea[53])),
        ea[54] !== ed
          ? ((Q = ed && (0, t.jsx)(v, { containerRef: em })),
            (ea[54] = ed),
            (ea[55] = Q))
          : (Q = ea[55]),
        ea[56] !== d
          ? ((q = (0, t.jsx)(i.f.Group, {
              className: "pointer-events-auto flex w-full items-center",
              children: d,
            })),
            (ea[56] = d),
            (ea[57] = q))
          : (q = ea[57]),
        ea[58] !== c
          ? ((X = (0, t.jsx)(i.f.Group, {
              className: "pointer-events-auto flex w-full items-center",
              children: c,
            })),
            (ea[58] = c),
            (ea[59] = X))
          : (X = ea[59]),
        ea[60] !== q || ea[61] !== X
          ? ((Y = (0, t.jsxs)(i.f.Root, {
              className:
                "pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col justify-between opacity-0 transition-opacity duration-300 data-[visible]:opacity-100",
              children: [q, X],
            })),
            (ea[60] = q),
            (ea[61] = X),
            (ea[62] = Y))
          : (Y = ea[62]),
        ea[63] !== ej || ea[64] !== ey || ea[65] !== ex
          ? ((ee = !ej && ey && (0, t.jsx)(g, { onClick: ex })),
            (ea[63] = ej),
            (ea[64] = ey),
            (ea[65] = ex),
            (ea[66] = ee))
          : (ee = ea[66]),
        ea[67] !== ej || ea[68] !== b
          ? ((et = ej && (0, t.jsx)(s.f, { loaderType: b })),
            (ea[67] = ej),
            (ea[68] = b),
            (ea[69] = et))
          : (et = ea[69]),
        ea[70] !== eu ||
        ea[71] !== es ||
        ea[72] !== eb ||
        ea[73] !== P ||
        ea[74] !== ew ||
        ea[75] !== ec ||
        ea[76] !== R ||
        ea[77] !== L ||
        ea[78] !== Q ||
        ea[79] !== Y ||
        ea[80] !== ee ||
        ea[81] !== et ||
        ea[82] !== U ||
        ea[83] !== H
          ? ((er = (0, t.jsx)("div", {
              ref: em,
              className: "relative isolate overflow-hidden rounded-md",
              children: (0, t.jsxs)(o.O, {
                ref: ef,
                playsInline: ec,
                autoPlay: es,
                muted: P,
                src: L,
                aspectRatio: eu,
                className: ew,
                onAutoPlayFail: eb,
                onProviderChange: U,
                onProviderSetup: H,
                ...R,
                children: [Z, B, J, W, G, Q, Y, ee, et],
              }),
            })),
            (ea[70] = eu),
            (ea[71] = es),
            (ea[72] = eb),
            (ea[73] = P),
            (ea[74] = ew),
            (ea[75] = ec),
            (ea[76] = R),
            (ea[77] = L),
            (ea[78] = Q),
            (ea[79] = Y),
            (ea[80] = ee),
            (ea[81] = et),
            (ea[82] = U),
            (ea[83] = H),
            (ea[84] = er))
          : (er = ea[84]),
        er
      );
    },
    T = (0, a.memo)((e) => {
      let i,
        n,
        o,
        l,
        a = (0, r.c)(9);
      return (
        a[0] !== e
          ? (({ roomId: n, ...i } = e), (a[0] = e), (a[1] = i), (a[2] = n))
          : ((i = a[1]), (n = a[2])),
        a[3] !== i || a[4] !== n
          ? ((o = (0, t.jsx)(P, { roomId: n, ...i })),
            (a[3] = i),
            (a[4] = n),
            (a[5] = o))
          : (o = a[5]),
        a[6] !== n || a[7] !== o
          ? ((l = (0, t.jsx)(b, { roomId: n, children: o })),
            (a[6] = n),
            (a[7] = o),
            (a[8] = l))
          : (l = a[8]),
        l
      );
    });
  e.s(["f", 0, T], 305088);
};
